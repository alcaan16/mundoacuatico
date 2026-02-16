import { useState, useEffect } from "react";

export function useFetchFishDetail(fishSlug) {
  const [fish, setFish] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    // Fíjate en la ruta: empieza con barra "/" porque está en public
    //fetch(`http://localhost:1234/fish/${fishSlug}`)
    fetch(`https://canister-api.vercel.app/fish/${fishSlug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data) => {
        setFish(data);
        setLoading(false); // ¡Ya tenemos datos!
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [fishSlug]);

  return { fish, loading };
}
