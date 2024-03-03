import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { ClipLoader } from "react-spinners";
import { userPost } from "../Types/user";
import TablistCard from "./TablistCards";
import { FetchData } from "../function/FetchData";
import { Button } from "react-bootstrap";
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
  const { likedAlbums, setLikedAlbums } = useFavoritesStore();
  return (
    <>
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
        <div className="d-flex justify-content-center align-items-center">
          Loading...&nbsp;
          <ClipLoader />
        </div>
      )}
      {!isLoading &&
        !error &&
        userData &&
        tab === "posts" &&
        userData.map((post) => {
          const liked = !!likedAlbums.find((a) => a.photoId === post.id);

          return (
            <div key={post.id}>
              <TablistCard user={post} tab={tab} />
              <Button variant="light">
                <LikeButton
                  key={`like-button-${post.id}`}
                  liked={liked}
                  onClick={() => {
                    if (liked) {
                      setLikedAlbums(
                        likedAlbums.filter((album) => album.photoId !== post.id)
                      );
                    } else {
                      setLikedAlbums([
                        ...likedAlbums,
                        {
                          photoId: post.id,
                          id: post.id,
                          userId: post.userId,
                          title: post.title,
                        },
                      ]);
                    }
                  }}
                />
              </Button>
            </div>
          );
        })}
      {!isLoading &&
        !error &&
        userData &&
        tab !== "posts" &&
        userData.map((ud) => {
          return (
            <div key={ud.id}>
              <TablistCard user={ud} tab={tab} />
            </div>
          );
        })}
    </Container>
  );
}
