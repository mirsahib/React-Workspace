import { useState } from "react";
import { useQuery } from "./lib/react-query";
import { debounce } from "./util";

import "./App.css";
import { AuthForm } from "./module/auth";




// Original API function
async function fetchTodos(params) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/todos?title_like=${params}`
	);
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
		<div className="flex flex-col gap-4 p-8">
			<h1 className="">Form</h1>
            <AuthForm/>
		</div>
	);
}

export default App;
