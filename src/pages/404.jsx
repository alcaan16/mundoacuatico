import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="container error-container">
      {/* Background Bubbles */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      <div style={{ position: "relative", zIndex: 10 }}>
        <h1
          className="title text-gradient"
          style={{ fontSize: "8rem", marginBottom: "0" }}
        >
          404
        </h1>
        <h2
          className="title"
          style={{ fontSize: "2rem", marginBottom: "1rem" }}
        >
          ¡Glub glub!
        </h2>
        <p
          className="subtitle"
          style={{ maxWidth: "600px", marginInline: "auto" }}
        >
          Parece que esta página se fue al fondo del mar. Lo sentimos, pero lo
          que buscas no está aquí.
        </p>

        <Link
          to="/"
          className="btn btn-primary"
          style={{ marginTop: "2rem", display: "inline-block" }}
        >
          Volver a la superficie
        </Link>
      </div>
    </main>
  );
}
