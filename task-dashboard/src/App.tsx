import {Dashboard} from "./component/Dashboard/Dashboard";
import {useState} from "react";
import "./App.css"; 

function App() {
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  const [theme, setTheme] = useState<"light" | "dark">(savedTheme || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
     document.body.className = newTheme;
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-secondary" onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
      <Dashboard />
     </>
  );
}

export default App;


