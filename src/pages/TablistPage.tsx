import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { ClipLoader } from "react-spinners";
import { userPost } from "../Types/user";
import TablistCard from "../Components/TablistCards";
import { Link } from "react-router-dom";

type tabs = "posts" | "albums" | "todos";

export function TabListComponent({ userId }: { userId: string }) {
  const [tab, setTab] = useState<tabs>("posts");
  const [userData, setUserData] = useState<userPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + userId + "/" + tab
      );
      const data = await response.json();
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
        userData.map((ud) => (
          <div key={ud.id}>
            <TablistCard key={ud.id} user={ud} />
          </div>
        ))}
    </>
  );
}
