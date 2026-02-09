import { useState } from "react";
import { useFetchFishList } from "../hook/useFetchFishList.js"; // Tu hook
import { FishListSidebar } from "../components/FishListSidebar.jsx";
import { FishListCard } from "../components/FishListCard.jsx";
import { useParams, Link } from "react-router-dom";
import "./FishList.css";

export default function FishList() {
  const { categorySlug } = useParams();
  const { fishes, loading } = useFetchFishList(categorySlug); // Asumimos que tu hook ahora devuelve 'fishes'
  // Estado para los filtros (incluimos family)
  const [filters, setFilters] = useState({
    origin: "Todos",
    level: "Todos",
  });
  
  if (!fishes) {
    return (
      (
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
      )
    );
  }
  
  if (loading) return <div>Cargando...</div>;

  // --- LÓGICA DE DATOS DINÁMICOS (Midudev Style: Calculated derived state) ---

  // 1. Extraemos las opciones únicas disponibles en tu JSON
  const uniqueOrigins = ["Todos", ...new Set(fishes.map((f) => f.origin))];
  const uniqueLevels = ["Todos", "Fácil", "Intermedio", "Experto"];

  // 2. Filtramos los peces
  const filteredFishes = fishes.filter((fish) => {
    // Si el filtro es "Todos", pasa. Si no, tiene que coincidir.
    const matchOrigin =
      filters.origin === "Todos" || fish.origin === filters.origin;
    const matchLevel =
      filters.level === "Todos" || fish.level === filters.level;

    return matchOrigin && matchLevel;
  });

  // Handler genérico para actualizar filtros
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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

      <div className="fish-layout">
        <FishListSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          // Pasamos las listas calculadas
          origins={uniqueOrigins}
          levels={uniqueLevels}
        />

        <main className="fish-grid">
          {filteredFishes.map((fish) => (
            <FishListCard
              key={fish.id}
              fish={fish}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
