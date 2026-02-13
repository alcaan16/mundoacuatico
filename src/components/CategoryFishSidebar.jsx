export function CategorySidebar({
  filters,
  onFilterChange,
  ORIGINS,
  LEVELS,
}) {
  return (
    <aside className="sidebar">
      {/* BUSCADOR */}
      <div className="sidebar-section">
        <h3 className="sidebar-heading">Buscar</h3>
        <input
          type="text"
          placeholder="Nombre de la categoría..."
          className="search-input"
          value={filters.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "0.375rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(255, 255, 255, 0.05)",
            color: "white",
            marginBottom: "1rem",
          }}
        />
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">Región / Origen</h3>
        <ul className="filter-list">
          {ORIGINS.map((origin) => (
            <li key={origin}>
              <button
                className={`filter-btn ${filters.origin === origin ? "active" : ""}`}
                onClick={() => onFilterChange("origin", origin)}
              >
                {origin}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">Nivel de Experiencia</h3>
        <ul className="filter-list">
          {LEVELS.map((level) => (
            <li key={level}>
              <button
                className={`filter-btn ${filters.level === level ? "active" : ""}`}
                onClick={() => onFilterChange("level", level)}
              >
                {level}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
