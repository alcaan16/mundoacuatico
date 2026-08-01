# MundoAcuático

SPA de catálogo de especies acuáticas. Consume la API propia
[canister-api](https://github.com/alcaan16/canister-api).

## Qué resuelve

Navegar un catálogo por categorías, ver la ficha de cada especie y marcar favoritos, con navegación
sin recargas y sin descargar el catálogo completo de una vez.

## Stack y arquitectura

- **React 19 + Vite 7**.
- **React Router 7** con rutas anidadas por categoría y ficha (`/category/:categorySlug/:fishSlug`).
- **Zustand** para estado global: un store de sesión y otro de favoritos.
- **Hooks propios de fetch** (`useFetchCategories`, `useFetchFishList`, `useFetchFishDetail`) que
  encapsulan la llamada y el estado de carga. Los componentes no hacen `fetch`.
- **Carga diferida** de todas las páginas con `lazy` + `Suspense`.
- **Ruta protegida** mediante componente `ProtectedRoute` con redirección.
- **Despliegue:** Vercel.

## Alcance: qué está y qué no

**Implementado:** listado y detalle contra API remota, categorías, paginación, favoritos
persistidos en memoria de sesión, code splitting por ruta, página 404 y scroll-to-top en cada cambio
de ruta.

**No implementado:** la sesión es un indicador en cliente, **no hay backend de autenticación**: el
login no valida credenciales contra ningún servicio y los favoritos se pierden al recargar. La URL
de la API está fijada en los hooks en lugar de en una variable de entorno.

## Ejecutar en local

```bash
git clone https://github.com/alcaan16/mundoacuatico.git
cd mundoacuatico
npm install
npm run dev
```

Necesita la API disponible. Para levantarla en local, ver
[canister-api](https://github.com/alcaan16/canister-api) y apuntar los hooks a `http://localhost:1234`.
