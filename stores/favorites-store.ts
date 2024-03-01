import { create } from "zustand";
import { favoriteType } from "../src/Types/favorites";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface photoState {
  likedAlbums: favoriteType[];

  setLikedAlbums: (likedAlbums: favoriteType[]) => void;
}
export const useFavoritesStore = create<photoState>()(
  devtools(
    persist(
      (set) => ({
        likedAlbums: [],
        setLikedAlbums: (likedAlbums) => set({ likedAlbums }),
      }),
      {
        name: "liked-album-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
export const getCount = (state: photoState) => {
  const count = state.likedAlbums.length;
  return count;
};
