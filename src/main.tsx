import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

<<<<<<< HEAD
// Initialize theme before first paint to prevent flash
const saved = localStorage.getItem("wread-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (saved === "dark" || (!saved && prefersDark)) {
  document.documentElement.classList.add("dark");
}

=======
>>>>>>> d9d42a9ad3414c393c0c8b4164ef6c1c415a8baf
createRoot(document.getElementById("root")!).render(<App />);
