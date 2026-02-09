import { Link } from "react-router-dom";

// --- DATOS CONSTANTES (Configuración) ---
const NAV_LINKS = [
  { label: "Inicio", path: "/" },
  { label: "Especies", path: "/category" }
];

export function Header() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link
          to="/"
          className="brand"
        >
          <h2>Mundo Acuático 🐟</h2>
        </Link>

        <nav className="nav-links">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="nav-link"
            >
              {label}
            </Link>
          ))}
        </nav>


      </div>
    </header>
  );
}
