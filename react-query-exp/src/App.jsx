import { memo, useState } from "react";
import { useQuery } from "./lib/react-query";
import { debounce } from "./util";
import "./App.css";


// Original API function
async function fetchTodos(params) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?title_like=${params}`);
    if (!response.ok) throw new Error("Network error");
    return response.json();
}

// Debounced version of fetchTodos
const fetchTodosDebounced = debounce(fetchTodos, 1000); // 1-second delay


function App() {
	const [searchTerm, setSearchTerm] = useState("");

    // **Pass the debounced function inside useQuery**
    const { data, isLoading, error } = useQuery({
        queryKey: ["todos", searchTerm], // Query key includes searchTerm
        queryFn: () => fetchTodosDebounced(searchTerm), // Call debounced function
    });

    return (
        <div>
            <h1>Todos</h1>
            <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching todos!</p>}
            <ul>
                {data?.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );

}

function ChildA() {
	console.log("🚀 ChildA Rendered");
	return <p>I depend on the `count` state in App!</p>;
}

// Child B does NOT depend on anything in App
function ChildB({message}) {
	console.log("🚀 ChildB Rendered",message);
	return <p>I don't depend on App's state! {message}</p>;
}
const MemoizedChildB = memo(ChildB);


export default App;
