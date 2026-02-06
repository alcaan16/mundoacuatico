

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src="/fondo2.png"
          alt="Fondo acuario"
        />
        <div className="overlay" />
      </div>

      <div className="hero-content container">
        <h1 className="title">
          Sumérgete en el <br />
          <span className="text-gradient">Mundo Acuático</span>
        </h1>
        <p className="subtitle">
          Descubre miles de especies, guías de cuidado y consejos de expertos.
        </p>

        <form
          className="search-bar"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="Buscar especies..."
            aria-label="Buscar"
          />
          <button
            type="submit"
            className="btn btn-primary"
          >
            Buscar
          </button>
        </form>

        <div className="tags">
          {["Para Principiantes", "Acuarios Plantados", "Arrecife"].map(
            (tag) => (
              <span
                key={tag}
                className="tag"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}