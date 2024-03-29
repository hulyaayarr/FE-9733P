import { useLoaderData } from "react-router-dom";
import { favoritePostType } from "../Types/favoritesPosts";
import { FetchData } from "../function/FetchData";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import LikeButton from "../Components/LikeButton";
import { useFavoritesStore } from "../../stores/favorites-store";

export async function loader() {
  return FetchData("https://jsonplaceholder.typicode.com/posts");
}

export default function AllPost() {
  //@ts-expect-error unknown
  const posts: favoritePostType[] = useLoaderData();
  // const { likedAlbums, setLikedAlbums } = useFavoritesStore();
  const { likedPosts, setLikedPosts } = useFavoritesStore();

  return (
    <>
      <Container>
        <Row>
          <h1 className=" ps-4 gy-4">Posts</h1>
          {posts.map((post) => {
            const liked = !!likedPosts.find((a) => a.id === post.id);

            return (
              <Col
                key={post.id}
                sm={12}
                md={6}
                xl={3}
                className="d-flex ps-4  gy-4 justify-content-center"
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Card.Text>{post.body}</Card.Text>
                    </Card.Subtitle>

                    <div className="text-center mt-5">
                      <Button
                        style={{
                          backgroundColor: "rgb(178, 172, 243)",
                          border: "none",
                          marginBottom: "10px",
                        }}
                        href={"/users/" + post.userId + "/posts/" + post.id}
                      >
                        See Comments
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "rgb(178, 172, 243)",
                          border: "none",
                        }}
                        href={"/users/" + post.userId}
                      >
                        View Profile
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                <div>
                  <Button variant="light">
                    <LikeButton
                      key={`like-button-${post.id}`}
                      liked={liked}
                      onClick={() => {
                        if (liked) {
                          setLikedPosts(
                            likedPosts.filter(
                              (liked) => liked.postId !== post.id
                            )
                          );
                        } else {
                          setLikedPosts([
                            ...likedPosts,
                            {
                              postId: post.id,
                              id: post.id,
                              userId: post.userId,
                              title: post.title,
                              body: post.body,
                            },
                          ]);
                        }
                      }}
                    />
                  </Button>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
