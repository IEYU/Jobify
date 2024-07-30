import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import customFetch from "./utils/customFetch.js";
import { ToastContainer } from "react-toastify";

//use axios to chain the methods
const data = await customFetch.get("/test"); //"/api/v1" is handled by customFetch, so just need "/test"
console.log(data);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
		<ToastContainer position="top-center" />
	</React.StrictMode>
);
