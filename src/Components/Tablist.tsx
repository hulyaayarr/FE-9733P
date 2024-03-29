import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { ClipLoader } from "react-spinners";
import { userPost } from "../Types/user";
import TablistCard from "./TablistCards";
import { FetchData } from "../function/FetchData";
import { Button, Col, Container } from "react-bootstrap";
import LikeButton from "./LikeButton";
import { useFavoritesStore } from "../../stores/favorites-store";

type tabs = "posts" | "albums" | "todos";

export function TabList({ userId }: { userId: string }) {
  const [tab, setTab] = useState<tabs>("posts");
  const [userData, setUserData] = useState<userPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await FetchData(
        "https://jsonplaceholder.typicode.com/users/" + userId + "/" + tab
      );

      setUserData(data);
      setIsLoading(false);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [tab]);
  const { likedPosts, setLikedPosts } = useFavoritesStore();

  return (
    <Container
      style={{
        minHeight: "100vh",
      }}
    >
      <Nav variant="tabs" defaultActiveKey="/post">
        <Nav.Item
          onClick={() => {
            setTab("posts");
          }}
        >
          <Nav.Link eventKey="/post">Post</Nav.Link>
        </Nav.Item>

        <Nav.Item
          onClick={() => {
            setTab("albums");
          }}
        >
          <Nav.Link eventKey="/album">Album</Nav.Link>
        </Nav.Item>

        <Nav.Item
          onClick={() => {
            setTab("todos");
          }}
        >
          <Nav.Link eventKey="/todo">Todo</Nav.Link>
        </Nav.Item>
      </Nav>
      {!!error && error}
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          Loading...&nbsp;
          <ClipLoader />
        </div>
      )}
      {!isLoading &&
        !error &&
        userData &&
        tab === "posts" &&
        userData.map((post) => {
          const liked = !!likedPosts.find((a) => a.id === post.id);

          return (
            <Col sm={12} md={6} xl={3} className="d-flex   mb-3 " key={post.id}>
              <TablistCard user={post} tab={tab} />
              <div>
                <Button variant="light">
                  <LikeButton
                    key={`like-button-${post.id}`}
                    liked={liked}
                    onClick={() => {
                      if (liked) {
                        setLikedPosts(
                          likedPosts.filter((album) => album.id !== post.id)
                        );
                      } else {
                        setLikedPosts([
                          ...likedPosts,
                          {
                            userId: post.userId,
                            id: post.id,
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
      {!isLoading &&
        !error &&
        userData &&
        tab !== "posts" &&
        userData.map((ud) => {
          return (
            <div key={ud.id}>
              <Col sm={12} md={6} xl={3} className="d-flex   mb-3 " key={ud.id}>
                <TablistCard user={ud} tab={tab} />
              </Col>
            </div>
          );
        })}
    </Container>
  );
}
