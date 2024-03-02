import { create } from "zustand";
import { favoriteType } from "../src/Types/favorites";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { favoritePostType } from "../src/Types/favoritesPosts";

interface photoState {
  likedAlbums: favoriteType[];
  likedPosts: favoritePostType[];
  setLikedAlbums: (likedAlbums: favoriteType[]) => void;
  setLikedPosts: (addedPost: favoritePostType[]) => void;
}
export const useFavoritesStore = create<photoState>()(
  devtools(
    persist(
      (set) => ({
        likedAlbums: [],
        likedPosts: [],
        setLikedAlbums: (likedAlbums) => set({ likedAlbums }),
        setLikedPosts: (likedPosts) => set({ likedPosts }),
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
