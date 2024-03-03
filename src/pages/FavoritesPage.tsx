import { FaTrash } from "react-icons/fa";
import { useFavoritesStore } from "../../stores/favorites-store";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const FavoritesPage = () => {
  const { likedAlbums, setLikedAlbums } = useFavoritesStore();

  return (
    <Container>
      <Row>
        <h1 className="mx-4 my-5">Favs Page</h1>
      </Row>
      <Row className="mx-4 " style={{ minHeight: "100vh" }}>
        {likedAlbums.length === 0 && <div>No Liked Post or Album Yet...</div>}
        {likedAlbums.map((likedPhoto) => (
          <Col>
            <FaTrash
              onClick={() => {
                setLikedAlbums(
                  likedAlbums.filter((album) => album.photoId !== likedPhoto.id)
                );
              }}
            />
            {likedPhoto.url && (
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <img
                    key={likedPhoto.id}
                    src={likedPhoto.url}
                    onClick={() => {
                      window.location.href = `/users/${likedPhoto.userId}/albums/${likedPhoto.albumId}`;
                    }}
                    style={{
                      height: "100px",
                    }}
                    alt={likedPhoto.title}
                  />

                  <div className="text-center -">
                    <Button
                      style={{
                        backgroundColor: "rgb(178, 172, 243)",
                        border: "none",
                      }}
                      href={"/users/" + likedPhoto.userId}
                    >
                      View Profile
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}
            {likedPhoto.title && (
              <Card style={{ width: "18rem", height: "18rem" }}>
                <Card.Body>
                  <Card.Title>{likedPhoto.title}</Card.Title>
                  <Card.Text> Body:{likedPhoto.body}</Card.Text>

                  <div className="d-flex justify-content-center ">
                    <Button
                      style={{
                        backgroundColor: "rgb(178, 172, 243)",
                        border: "none",
                        marginRight: "10px",
                      }}
                      href={
                        "/users/" +
                        likedPhoto.userId +
                        "/posts/" +
                        likedPhoto.id
                      }
                    >
                      See Comments
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "rgb(178, 172, 243)",
                        border: "none",
                      }}
                      href={"/users/" + likedPhoto.userId}
                    >
                      View Profile
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesPage;
