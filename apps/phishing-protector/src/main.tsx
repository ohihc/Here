import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const app = document.createElement("div");
app.id = "phishing-protector";
document.body.appendChild(app);

const root = createRoot(app)
root.render(<App />);
