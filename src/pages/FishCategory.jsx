import { useFetchCategories } from "../hook/useFetchCategories.js";
import { CategoryCard } from "../components/CategoryFishCard.jsx";
import { CategorySidebar } from "../components/CategoryFishSidebar.jsx";
import { Link, useSearchParams } from "react-router-dom";
import "./FishCategory.css";
import { Pagination } from "../components/Pagination.jsx";

//const { categories, loading, error } = useFishData();
export default function FishCategory() {
  const { categories } = useFetchCategories();

  const ORIGINS = ["Todos", ...new Set(categories.map((c) => c.origin))];
  const LEVELS = ["Todos", "Facil", "Intermedio", "Experto"];

  // --- PÁGINA PRINCIPAL ---

  const [searchParams, setSearchParams] = useSearchParams();

  const currentOrigin = searchParams.get("origin") || "Todos";
  const currentLevel = searchParams.get("level") || "Todos";
  const currentSearch = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Derivamos los filtros del URL
  const filters = {
    origin: currentOrigin,
    level: currentLevel,
    search: currentSearch,
  };

  const handleFilterChange = (key, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value === "" || value === "Todos") {
        if (key !== "search")
          newParams.set(key, "Todos"); // Mantener "Todos" explícito para selectores si se prefiere, o eliminarlo.
        else newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      // Caso especial para cuando el valor es "Todos" en botones, aseguramos que se setee
      if (value === "Todos") newParams.set(key, "Todos");
      if (value === "") newParams.delete(key); // Para el search vacio

      newParams.set("page", "1"); // Reset a página 1 al filtrar
      return newParams;
    });
  };

  const filteredCategories = categories.filter((cat) => {
    const matchOrigin =
      currentOrigin === "Todos" || cat.origin === currentOrigin;
    const matchLevel = currentLevel === "Todos" || cat.level === currentLevel;
    const matchSearch = cat.name
      .toLowerCase()
      .includes(currentSearch.toLowerCase());

    return matchOrigin && matchLevel && matchSearch;
  });

  const RESULTS_PER_PAGE = 4;
  const totalPages = Math.ceil(filteredCategories.length / RESULTS_PER_PAGE);

  const pagedCategories = filteredCategories.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page.toString());
      return newParams;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          {pagedCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
            />
          ))}
        </main>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
4;
