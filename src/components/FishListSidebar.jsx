export function FishListSidebar({ filters, onFilterChange, origins, levels }) {
  return (
    <aside className="sidebar">
      {/* 2. FILTRO POR ORIGEN */}
      <div className="sidebar-section">
        <h3 className="sidebar-heading">Región / Origen</h3>
        <ul className="filter-list">
          {origins.map((origin) => (
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

      {/* 3. FILTRO POR NIVEL (Estilo "Chips" horizontal) */}
      <div className="sidebar-section">
        <h3 className="sidebar-heading">Nivel de Experiencia</h3>
        <div className="chips-container">
          {levels.map((level) => {
            // Normalizamos para usar como clase CSS (ej: "Fácil" -> "facil")
            const classSuffix = level
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, "-");

            return (
              <button
                key={level}
                className={`chip chip-${classSuffix} ${filters.level === level ? "active" : ""}`}
                onClick={() => onFilterChange("level", level)}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
