import { FaTrash } from "react-icons/fa";
import { useFavoritesStore } from "../../stores/favorites-store";
import { Card } from "react-bootstrap";

const FavoritesPage = () => {
  const { likedAlbums, setLikedAlbums } = useFavoritesStore();

  return (
    <>
      <h1>Favs Page</h1>
      {likedAlbums.map((likedPhoto) => (
        <div key={likedPhoto.id}>
          <FaTrash
            onClick={() => {
              setLikedAlbums(
                likedAlbums.filter((album) => album.photoId !== likedPhoto.id)
              );
            }}
          />

          {likedPhoto.url && (
            <img
              key={likedPhoto.id}
              src={likedPhoto.url}
              onClick={() => {
                window.location.href = `/users/${likedPhoto.userId}/albums/${likedPhoto.albumId}`;
              }}
              alt={likedPhoto.title}
            />
          )}
          {likedPhoto.title && (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  User Id:{likedPhoto.userId}
                  <br />
                  Post Id:{likedPhoto.id};
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Title :{likedPhoto.title}
                </Card.Subtitle>
                <Card.Text> Body:{likedPhoto.body}</Card.Text>
                <Card.Link
                  href={
                    "/users/" + likedPhoto.userId + "/posts/" + likedPhoto.id
                  }
                >
                  See Post
                </Card.Link>
              </Card.Body>
            </Card>
          )}
        </div>
      ))}
    </>
  );
};

export default FavoritesPage;
