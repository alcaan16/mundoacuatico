import { useParams, Link } from "react-router-dom";
import "./FishDetail.css";
import { useFetchFishDetail } from "../hook/useFetchFishDetail";

export default function FishDetail() {
  const { categorySlug, fishSlug } = useParams();

  const { fish, loading } = useFetchFishDetail(fishSlug);
  console.log(fish);
  if (!fish) {
    return (
      console.log("no encontrado"),
      <div
        className="container"
        style={{ padding: "5rem", textAlign: "center" }}
      >
        <h2>⚠️ Pez no encontrado</h2>
        <Link
          to={`/category/${categorySlug}`}
          className="btn btn-primary"
          style={{ marginTop: "2rem", display: "inline-block" }}
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  // 4. Si fish es null, mostramos cargando
  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "5rem" }}
      >
        Cargando ficha... 🐠
      </div>
    );
  }
  // 5. Si llegamos aquí, es que tenemos datos (fish tiene contenido)
  return (
    <div className="container detail-container">
      {/* NAVEGACIÓN */}
      <nav className="breadcrumbs">
        <Link to="/">{"Inicio".toUpperCase()}</Link> /
        <Link to="/category">{"Categorias".toUpperCase()}</Link> /
        <Link to={`/category/${categorySlug}`}>
          {categorySlug.toUpperCase()}
        </Link>{" "}
        /<span className="breadcrumb-current">{fish.name.toUpperCase()}</span>
      </nav>

      <div className="detail-grid">
        {/* COLUMNA IZQUIERDA (Principal) */}
        <div className="left-col">
          {/* Header */}
          <header className="fish-header">
            <div className="fish-title-row">
              <h1 className="fish-title">{fish.name}</h1>
              <span className="badge-pill badge-success">
                Apto para {fish.level}
              </span>
            </div>
            <p className="fish-scientific">{fish.scientific}</p>
          </header>

          {/* Galería */}
          <section className="gallery-section">
            <img
              src={fish.image}
              alt={fish.name}
              className="main-image"
            />
          </section>

          {/* Tarjeta de Compatibilidad */}
          <section className="detail-card">
            <h3 className="card-heading">
              <span className="material-symbols-outlined">diversity_3</span>
              Compatibilidad
            </h3>

            <div className="compatibility-bar">
              <div className="compatibility-fill"></div>
            </div>
            <p style={{ color: "var(--color-text-muted)" }}>
              {fish.compatibility?.summary ||
                "Generalmente pacífico con peces de su tamaño."}
            </p>

            <div className="partners-grid">
              {fish.compatibility?.partners?.map((partner, idx) => (
                <div
                  key={idx}
                  className="partner-item"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      color: partner.type === "great" ? "green" : "orange",
                    }}
                  >
                    {partner.type === "great" ? "check_circle" : "warning"}
                  </span>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.9rem" }}>
                      {partner.name}
                    </strong>
                  </div>
                </div>
              )) || <p>Datos de compañeros no disponibles.</p>}
            </div>
          </section>

          {/* Descripción / Tabs */}
          <section className="detail-card">
            <h2 className="card-heading">Resumen</h2>
            <p style={{ lineHeight: "1.8", color: "var(--color-text-muted)" }}>
              {fish.description_full || fish.description}
            </p>
          </section>
        </div>

        {/* COLUMNA DERECHA (Sidebar Sticky) */}
        <aside className="right-col">
          <div className="specs-card">
            <div className="specs-header">Especificaciones Técnicas</div>

            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Temp</span>
                <span className="spec-value">
                  {fish.specs?.temp || fish.temp || "N/A"}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">pH</span>
                <span className="spec-value">
                  {fish.specs?.ph || fish.ph || "N/A"}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Dureza</span>
                <span className="spec-value">
                  {fish.specs?.hardness || "Media"}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Tamaño Máx</span>
                <span className="spec-value">
                  {fish.specs?.max_size || "N/A"}
                </span>
              </div>

              <div className="spec-item spec-full">
                <div>
                  <span className="spec-label">Tanque Mínimo</span>
                  <span className="spec-value">
                    {fish.specs?.min_tank || "N/A"}
                  </span>
                </div>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "2rem", opacity: 0.5 }}
                >
                  water_full
                </span>
              </div>
            </div>

            <div style={{ padding: "0 1.5rem 1.5rem" }}>
              <button className="add-btn">
                <span className="material-symbols-outlined">add</span>
                Añadir a Mi Acuario
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
