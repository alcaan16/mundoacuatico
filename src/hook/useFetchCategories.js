import { useState, useEffect } from "react";

export function useFetchCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    // Fíjate en la ruta: empieza con barra "/" porque está en public
    //fetch("/data/categories-list.json");
    //fetch("http://localhost:1234/fish-categories")
    fetch("https://canister-api.vercel.app/fish-categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false); // ¡Ya tenemos datos!
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Devolvemos un objeto para que sea más fácil de expandir en el futuro
  return { categories, loading };
}
