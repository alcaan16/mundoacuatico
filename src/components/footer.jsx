const FOOTER_LINKS = {
  Descubrir: ["Base de Datos", "Guías de Cuidado", "Montaje", "Paisajismo"],
  Comunidad: ["Foro", "Eventos", "Mercado", "Expertos"],
  Legal: ["Privacidad", "Términos", "Cookies"],
};

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="brand-col">
          <h3>Aquarium Hub</h3>
          <p>Tu recurso definitivo para el cuidado del acuario.</p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h4>{title}</h4>
            <ul className="link-list">
              {links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}