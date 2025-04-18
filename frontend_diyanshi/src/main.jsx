import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppContext } from "./context/ContextApi.jsx";
import { BrowserRouter } from "react-router-dom";
// import {CustomizeChannelPage} from "";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContext>
  </React.StrictMode>
);
