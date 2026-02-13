import { useState } from "react";
import { useFetchCategories } from "../hook/useFetchCategories.js";
import { CategoryCard } from "../components/CategoryFishCard.jsx";
import { CategorySidebar } from "../components/CategoryFishSidebar.jsx";
import { Link } from "react-router-dom";
import "./FishCategory.css";
import { Pagination } from "../components/Pagination.jsx";

//const { categories, loading, error } = useFishData();
export default function FishCategory() {
  const { categories } = useFetchCategories();

  const ORIGINS = ["Todos", ...new Set(categories.map((c) => c.origin))];
  const LEVELS = ["Todos", "Facil", "Intermedio", "Experto"];

  // --- PÁGINA PRINCIPAL ---

  const [filters, setFilters] = useState({
    origin: "Todos",
    level: "Todos",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredCategories = categories.filter((cat) => {
    const matchOrigin =
      filters.origin === "Todos" || cat.origin === filters.origin;
    const matchLevel = filters.level === "Todos" || cat.level === filters.level;
    return matchOrigin && matchLevel;
  });

  return (
    <div className="category-page container">
      <nav className="breadcrumbs">
        <Link to="/">{"Inicio".toUpperCase()}</Link> /
        <span className="breadcrumb-current">{"Categorias".toUpperCase()}</span>
      </nav>
      <header className="category-header">
        <div>
          <h1 className="page-title">Familias de Peces</h1>
          <p className="page-desc">
            Navega por las principales Categorias para encontrar la especie
            perfecta para tu biotipo.
          </p>
        </div>
        <span className="result-count">
          {filteredCategories.length} familias listadas
        </span>
      </header>

      <div className="category-layout">
        <CategorySidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          ORIGINS={ORIGINS}
          LEVELS={LEVELS}
        />

        <main className="category-grid">
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
            />
          ))}
        </main>
      </div>
          <Pagination
          />
    </div>
  );
}
