import { useEffect, useState } from "react";
import "./App.css";
import counterStore from "./flux/store";
import dispatcher from "./flux/dispatcher";
import { decrementAction, incrementAction, resetAction } from "./flux/action";

function App() {
	const [count, setCount] = useState(counterStore.getCount());  
	console.log("🚀 ~ App ~ count:", count)

	useEffect(() => {
    const updateCount = () => setCount(counterStore.getCount());
    counterStore.subscribe(updateCount);
		return () => counterStore.unsubscribe(updateCount);
	}, []);

	return (
		<div>
			<h1>Flux</h1>
			<h2>Count: {count}</h2>
			<button onClick={() => dispatcher.dispatch(incrementAction)}>
				Increment
			</button>
			<button onClick={() => dispatcher.dispatch(decrementAction)}>
				Decrement
			</button>
      <button onClick={() => dispatcher.dispatch(resetAction)}>
        Reset
      </button>
		</div>
	);
}

export default App;
