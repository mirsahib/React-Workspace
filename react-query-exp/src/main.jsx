import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
	QueryClientProvider,
} from "./lib/react-query/index.jsx";
import createQueryClient from "./lib/react-query/index.jsx";
const queryClient = createQueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>
);
