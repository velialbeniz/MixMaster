import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";



ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ToastContainer
			position="top-center"
			theme="dark"
			autoClose={1500} />
			<App />
	</React.StrictMode>,
);
