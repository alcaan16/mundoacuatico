import { useState, useEffect } from "react";

export function useFetchFishList(categorySlug) {
  const [fishes, setFishes] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    // Fíjate en la ruta: empieza con barra "/" porque está en public
    fetch(`/data/${categorySlug}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => {
        setFishes(data);
        setLoading(false); // ¡Ya tenemos datos!
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categorySlug]);

  return { fishes, loading };
}
