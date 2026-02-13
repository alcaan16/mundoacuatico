import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { FishListCard } from "../components/FishListCard";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { isLoggedIn, logout } = useAuthStore();
  const { favorites } = useFavoritesStore();

  // Estado para los peces favoritos
  const [favoriteFishes, setFavoriteFishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock User Data (ya que authStore no tiene datos de usuario)
  const user = {
    name: "Acuarista Apasionado",
    email: "usuario@mundoacuatico.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    memberSince: "Enero 2024",
    level: "Experto",
  };

  useEffect(() => {
    // Si no hay favoritos, no hacemos fetch
    if (favorites.length === 0) {
      setFavoriteFishes([]);
      setLoading(false);
      return;
    }

    // Función para cargar todos los peces y filtrar
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        // 1. Obtener lista de categorías para saber qué arcivos leer
        const catsRes = await fetch("/data/categories-list.json");
        const categories = await catsRes.json();

        // 2. Cargar todos los JSON de peces en paralelo
        const promises = categories.map((cat) =>
          fetch(`/data/${cat.slug}.json`)
            .then((res) => (res.ok ? res.json() : []))
            .catch(() => []),
        );

        const results = await Promise.all(promises);

        // 3. Aplanar array de arrays
        const allFishes = results.flat();

        // 4. Filtrar los que están en favoritos (por ID o Slug)
        // Usamos SLUG porque los IDs en los JSONs individuales no coinciden con los de las categorías
        const myFishes = allFishes.filter((fish) =>
          favorites.includes(fish.slug),
        );

        setFavoriteFishes(myFishes);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (!isLoggedIn) {
    return (
      <div
        className="container profile-container"
        style={{
          textAlign: "center",
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div>
          <h2>🔒 Acceso Restringido</h2>
          <p
            className="text-muted"
            style={{ marginBottom: "2rem" }}
          >
            Debes iniciar sesión para ver tu perfil y favoritos.
          </p>
          <Link
            to="/"
            className="btn btn-primary"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container profile-container">
      {/* HEADER DE PERFIL */}
      <header className="profile-header">
        <img
          src={user.avatar}
          alt="Avatar"
          className="profile-avatar"
        />

        <div className="profile-info">
          <h1 className="profile-name">{user.name}</h1>
          <div className="profile-email">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1.2rem" }}
            >
              mail
            </span>
            {user.email}
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">{user.memberSince}</span>
              <span className="stat-label">Miembro desde</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user.level}</span>
              <span className="stat-label">Nivel</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{favorites.length}</span>
              <span className="stat-label">Favoritos</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button
            onClick={logout}
            className="btn btn-primary"
            style={{ backgroundColor: "#ef4444" }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* SECCIÓN DE FAVORITOS */}
      <section className="favorites-section">
        <h2 className="section-title">
          <span
            className="material-symbols-outlined"
            style={{ color: "#ef4444" }}
          >
            favorite
          </span>
          Mis Peces Favoritos
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div className="spinner"></div>
            <p className="text-muted">Cargando tus favoritos...</p>
          </div>
        ) : favoriteFishes.length > 0 ? (
          <div className="favorites-grid">
            {favoriteFishes.map((fish) => (
              <FishListCard
                key={fish.id}
                fish={fish}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="material-symbols-outlined empty-icon">
              sentiment_dissatisfied
            </span>
            <p className="empty-text">
              Aún no has guardado ningún pez en tus favoritos.
            </p>
            <Link
              to="/category"
              className="btn btn-primary"
            >
              Explorar Catálogo
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
