import { Link } from "react-router-dom";

export function FishListCard({ fish }) {
  // Mismo mapeo de colores para la dificultad
  const badgeColor =
    {
      Fácil: "bg-green",
      Intermedio: "bg-yellow",
      Experto: "bg-red",
    }[fish.level] || "bg-gray";

  return (
    // IMPORTANTE: Usamos la misma clase 'category-card' para heredar el estilo exacto
    <article className="category-card">
      <div className="card-image-wrapper">
        <img
          src={fish.image}
          alt={fish.name}
          className="card-image"
          loading="lazy"
        />
        <div className="card-overlay" />
        <span className={`badge ${badgeColor}`}>{fish.level}</span>
      </div>

      <div className="card-content">
        <header className="card-header-info">
          <div>
            <h3 className="card-title">{fish.name}</h3>
            <span className="card-scientific">{fish.scientific}</span>
          </div>
        </header>

        <p className="card-description">{fish.description}</p>

        {/* AQUÍ CAMBIAMOS LOS DATOS: Mostramos parámetros técnicos */}
        <div className="card-meta">
          {/* Parámetros del agua */}
          <div className="meta-row">
            <span className="pill">💧 pH {fish.parameters.ph}</span>
            <span className="pill">🌡️ {fish.parameters.temp}</span>
          </div>

          {/* Requisitos físicos */}
          <div className="meta-item">
            <span className="meta-label">Acuario mín.</span>
            <span className="meta-value">
              {fish.care_info.min_liters} Litros
            </span>
          </div>
        </div>

        <Link
          to={`/category/${fish.category_slug}/${fish.slug}`}
          className="btn-explore"
        >
          Ver Ficha Completa
        </Link>
      </div>
    </article>
  );
}
