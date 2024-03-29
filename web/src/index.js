import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./components/contexts/AuthContext";
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals(sendToVercelAnalytics);
