import { useFetchFishList } from "../hook/useFetchFishList.js";
import { FishListSidebar } from "../components/FishListSidebar.jsx";
import { FishListCard } from "../components/FishListCard.jsx";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Pagination } from "../components/Pagination.jsx";
import "./FishList.css";

export default function FishList() {
  const { categorySlug } = useParams();
  const { fishes, loading } = useFetchFishList(categorySlug);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentOrigin = searchParams.get("origin") || "Todos";
  const currentLevel = searchParams.get("level") || "Todos";
  const currentSearch = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  if (!fishes) {
    return (
      <div
        className="container"
        style={{ padding: "5rem", textAlign: "center" }}
      >
        <h2>⚠️ Categoria no encontrado</h2>
        <Link
          to={`/category`}
          className="btn btn-primary"
          style={{ marginTop: "2rem", display: "inline-block" }}
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (loading) return <div>Cargando...</div>;

  // --- LÓGICA DE DATOS DINÁMICOS ---

  // 1. Extraemos las opciones únicas disponibles en el JSON
  // Usamos Set para evitar duplicados y que se adapte a los datos (e.g. "facil", "medio")
  const uniqueOrigins = ["Todos", ...new Set(fishes.map((f) => f.origin))];
  const uniqueLevels = ["Todos", ...new Set(fishes.map((f) => f.level))];

  // 2. Filtramos los peces
  const filteredFishes = fishes.filter((fish) => {
    const matchOrigin =
      currentOrigin === "Todos" || fish.origin === currentOrigin;
    const matchLevel = currentLevel === "Todos" || fish.level === currentLevel;
    const matchSearch = fish.name
      .toLowerCase()
      .includes(currentSearch.toLowerCase());

    return matchOrigin && matchLevel && matchSearch;
  });

  // 3. Paginación
  const RESULTS_PER_PAGE = 4;
  const totalPages = Math.ceil(filteredFishes.length / RESULTS_PER_PAGE);

  const pagedFishes = filteredFishes.slice(
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

  const handleFilterChange = (key, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value === "Todos" || value === "") {
        if (key === "search") newParams.delete(key);
        else newParams.set(key, "Todos");
      } else {
        newParams.set(key, value);
      }
      newParams.set("page", "1"); // Reset a página 1 al filtrar
      return newParams;
    });
  };

  const handleSearchChange = (e) => {
    handleFilterChange("search", e.target.value);
  };

  const filters = {
    origin: currentOrigin,
    level: currentLevel,
  };

  return (
    <div className="fish-page container">
      <nav className="breadcrumbs">
        <Link to="/">{"Inicio".toUpperCase()}</Link> /
        <Link to="/category">{"Categorias".toUpperCase()}</Link> /
        <span className="breadcrumb-current">{categorySlug.toUpperCase()}</span>
      </nav>
      <header className="fish-header">
        <div>
          <h1 className="page-title">Peces de la familia {categorySlug}</h1>
          <p className="page-desc">
            Encuentra los peces perfectos para tu acuario según su nivel y
            origen de la familia {categorySlug}.
          </p>
        </div>
        <span className="result-count">
          {filteredFishes.length} Peces listados
        </span>
      </header>

      {/* Barra de búsqueda */}
      <div
        className="search-container"
        style={{ marginBottom: "1rem" }}
      >
        <input
          type="text"
          placeholder="Buscar pez..."
          value={currentSearch}
          onChange={handleSearchChange}
          className="form-control"
          style={{
            width: "100%",
            maxWidth: "300px",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div className="fish-layout">
        <FishListSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          // Pasamos las listas calculadas
          origins={uniqueOrigins}
          levels={uniqueLevels}
        />

        <main className="fish-grid">
          {pagedFishes.length > 0 ? (
            pagedFishes.map((fish) => (
              <FishListCard
                key={fish.id}
                fish={fish}
              />
            ))
          ) : (
            <p>No se encontraron peces con esos filtros.</p>
          )}
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
