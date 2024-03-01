import { useFavoritesStore } from "../../stores/favorites-store";

const FavoritesPage = () => {
  const { likedAlbums } = useFavoritesStore();

  return (
    <>
      <h1>Favs Page</h1>
      {likedAlbums.map((likedPhoto) => (
        <img key={likedPhoto.id} src={likedPhoto.url} alt="" />
      ))}
    </>
  );
};

export default FavoritesPage;
