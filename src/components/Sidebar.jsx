export function Sidebar({ filters, onFilterChange, ORIGINS, LEVELS }) {
    return (
      <aside className="sidebar">
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