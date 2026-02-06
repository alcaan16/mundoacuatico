import { Routes, Route, Link } from "react-router-dom";
import "./index.css";
import { Hero } from "./components/hero-index.jsx";
import { FishCategory } from "./fish_category.jsx";


// --- APP PRINCIPAL ---

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Hero />}
      />
      <Route
        path="/category"
        element={<FishCategory />}
      />


    </Routes>
  );
}
