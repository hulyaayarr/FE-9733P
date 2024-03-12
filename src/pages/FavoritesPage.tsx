import { FaTrash } from "react-icons/fa";
import { useFavoritesStore } from "../../stores/favorites-store";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const FavoritesPage = () => {
  const { likedAlbums, setLikedAlbums } = useFavoritesStore();
  const { likedPosts, setLikedPosts } = useFavoritesStore();

  return (
    <Container>
      <Row>
        <h1 className="mx-4 my-5">Favs Page</h1>
      </Row>
      <Row className="mx-4 " style={{ minHeight: "100vh" }}>
        {likedAlbums.length === 0 && likedPosts.length === 0 && (
          <div>No Liked Post or Album Yet...</div>
        )}
        {likedAlbums.map((likedPhoto) => (
          <Col key={likedPhoto.id}>
            <FaTrash
              onClick={() => {
                setLikedAlbums(
                  likedAlbums.filter(
                    (_, index) => index !== likedAlbums.indexOf(likedPhoto)
                  )
                );
              }}
            />

            <Card style={{ width: "18rem", height: "20rem" }}>
              <Card.Body>
                <Card.Text>
                  <h5>{likedPhoto.title}</h5>
                </Card.Text>

                <div className="text-center">
                  <img
                    key={likedPhoto.albumId}
                    src={likedPhoto.url}
                    onClick={() => {
                      window.location.href = `/users/${likedPhoto.userId}/albums/${likedPhoto.albumId}`;
                    }}
                    style={{
                      height: "200px",
                      textAlign: "center",
                      marginBottom: "50px",
                    }}
                    alt={likedPhoto.title}
                  />
                </div>

                <div className="text-center">
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
          </Col>
        ))}
        {likedPosts.map((likedPost) => (
          <Col key={likedPost.id}>
            <FaTrash
              onClick={() => {
                setLikedPosts(
                  likedPosts.filter(
                    (_, index) => index !== likedPosts.indexOf(likedPost)
                  )
                );
              }}
            />

            <Card
              style={{ width: "18rem", height: "20rem" }}
              key={likedPost.postId}
            >
              <Card.Body>
                <Card.Title>{likedPost.title}</Card.Title>
                <Card.Text> {likedPost.body}</Card.Text>

                <div className="d-flex justify-content-center ">
                  <Button
                    style={{
                      backgroundColor: "rgb(178, 172, 243)",
                      border: "none",
                      marginRight: "10px",
                    }}
                    href={
                      "/users/" + likedPost.userId + "/posts/" + likedPost.id
                    }
                  >
                    See Comments
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "rgb(178, 172, 243)",
                      border: "none",
                    }}
                    href={"/users/" + likedPost.userId}
                  >
                    View Profile
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesPage;
