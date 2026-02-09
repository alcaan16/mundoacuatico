import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const FishCategory = lazy(() => import("./pages/FishCategory.jsx"));
const FishList = lazy(() => import("./pages/FishList.jsx"));
const FishDetail = lazy(() => import("./pages/FishDetail.jsx"));
const NotFoundPage = lazy(() => import("./pages/404.jsx"));
// --- APP PRINCIPAL ---

 function App() {
   return (
     <>
       <Header />
       <Suspense
         fallback={
           <div
             style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}
           >
             Cargando...
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
         </Routes>
       </Suspense>
       <Footer />
     </>
   );
}

export default App;