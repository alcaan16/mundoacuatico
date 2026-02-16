import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

export function Header() {
  const { isLoggedIn, logout } = useAuthStore();
  const { countFavorites } = useFavoritesStore();
  const numbersFavorites = countFavorites();

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link
          to="https://apifishs.vercel.app"
          className="brand"
        >
          <h2>Mundo Acuático 🐟</h2>
        </Link>

        <nav className="nav-links">
          <NavLink
            key="Inicio"
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-links"
            }
          >
            Inicio
          </NavLink>

          <NavLink
            key="Especies"
            to="/category"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-links"
            }
          >
            Especies
          </NavLink>
        </nav>
      </div>

      {isLoggedIn && (
        <div className="nav-actions">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-favorite-btn active" : "nav-favorite-btn"
            }
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1.2rem" }}
            >
              account_circle
            </span>
            <span>Mi Perfil</span>
            {numbersFavorites > 0 && (
              <span className="fav-badge">{numbersFavorites}</span>
            )}
          </NavLink>
        </div>
      )}

      <div className="auth-section">
        {isLoggedIn ? (
          <button
            className="btn btn-primary"
            onClick={logout}
            style={{ backgroundColor: "#e94040b2" }}
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
}
