import { Link } from "react-router-dom";

export function CategoryCard({ category }) {
    const badgeColor =
      {
        Fácil: "bg-green",
        Intermedio: "bg-yellow",
        Experto: "bg-red",
      }[category.level] || "bg-gray";

    return (
      <article className="category-card">
        <div className="card-image-wrapper">
          <img
            src={category.image}
            alt={category.name}
            className="card-image"
            loading="lazy"
          />
          <div className="card-overlay" />
          <span className={`badge ${badgeColor}`}>{category.level}</span>
        </div>

        <div className="card-content">
          <header className="card-header-info">
            <div>
              <h3 className="card-title">{category.name}</h3>
              <span className="card-scientific">{category.scientific}</span>
            </div>
          </header>

          <p className="card-description">{category.description}</p>

          <div className="card-meta">
            <div className="meta-item">
              <span className="meta-label">Origen</span>
              <span className="meta-value">{category.origin}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Biotopo</span>
              <span className="meta-value">{category.biotope}</span>
            </div>
          </div>

          <Link
            to={`/category/${category.slug}`}
            //to={`/category/ciclidos`}
            className="btn-explore"
          >
            Explorar Especies
          </Link>
        </div>
      </article>
    );
  }