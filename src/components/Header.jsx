import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// --- DATOS CONSTANTES (Configuración) ---
const NAV_LINKS = [
  { label: "Inicio", path: "/" },
  { label: "Especies", path: "/category" },
  { label: "Login", path: "/login" }
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
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-links"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>


      </div>
    </header>
  );
}
