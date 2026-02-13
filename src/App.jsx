import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const FishCategory = lazy(() => import("./pages/FishCategory.jsx"));
const FishList = lazy(() => import("./pages/FishList.jsx"));
const FishDetail = lazy(() => import("./pages/FishDetail.jsx"));
const NotFoundPage = lazy(() => import("./pages/404.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// --- APP PRINCIPAL ---

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app-container">
      <Header />

      <Suspense
        fallback={
          <div
            className="container"
            style={{ padding: "5rem" }}
          >
            Cargando... 🐟
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/category"
            element={<FishCategory />}
          />
          <Route
            path="/category/:categorySlug"
            element={<FishList />}
          />
          <Route
            path="/category/:categorySlug/:fishSlug"
            element={<FishDetail />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectTo="/login">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
