import { Link } from "react-router-dom";

// --- DATOS CONSTANTES (Configuración) ---
const NAV_LINKS = [
  { label: "Inicio", path: "/" },
  { label: "Especies", path: "/category" },
  { label: "Cuidados", path: "#" },
  { label: "Comunidad", path: "#" },
];

export function Header() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link
          to="/"
          className="brand"
        >
          <h2>Aquarium Hub</h2>
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

        <div className="nav-actions">
          <button className="btn btn-ghost">Entrar</button>
          <button className="btn btn-primary">Registro</button>
        </div>
      </div>
    </header>
  );
}
