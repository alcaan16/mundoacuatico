import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./register.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      // En un caso real aquí se llamaría a la API de registro
      // Simulamos login automático al registrarse
      login();
      navigate("/profile");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Únete a Nosotros</h1>
        <p className="register-subtitle">
          Crea tu cuenta para guardar favoritos y más
        </p>

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-button"
          >
            Registrarse
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?
          <Link
            to="/login"
            className="auth-link"
          >
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
