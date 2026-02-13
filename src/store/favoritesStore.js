import { create } from "zustand";

export const useFavoritesStore = create((set, get, store) => ({
    favorites: [],

    clearFavorites: () => {
        set(store.getInitialState())
    },

    addFavorite: (fishId) =>
        set((state) => ({
            favorites: state.favorites.includes(fishId)
                ? state.favorites
                : [...state.favorites, fishId],
        })),
  
    removeFavorite: (fishId) =>
        set((state) => ({
            favorites: state.favorites.filter((id) => id !== fishId),
        })),
  
    isfavorite: (fishId) => {
        return get().favorites.includes(fishId)
    },

    toggleFavorite: (fishId) => {
        const { addFavorite, removeFavorite, isfavorite } = get();
        const isFav = isfavorite(fishId);
        isFav ? removeFavorite(fishId) : addFavorite(fishId);
    },
    
    countFavorites: () => {
        return get().favorites.length;
    }
}));