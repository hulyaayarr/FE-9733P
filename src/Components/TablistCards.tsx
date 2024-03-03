import Card from "react-bootstrap/Card";
import { userPost } from "../Types/user";
import { Button } from "react-bootstrap";
type tabs = "posts" | "albums" | "todos";

export default function TablistCard({
  user,
  tab,
}: {
  user: userPost;
  tab: tabs;
}) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{user.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.body}</Card.Subtitle>
        {tab === "todos" && <Card.Text>Completed: {user.completed}</Card.Text>}
        {tab !== "todos" && (
          <div className="d-flex justify-content-center mt-5">
            <Button
              style={{
                backgroundColor: "rgb(178, 172, 243)",
                border: "none",
                marginBottom: "10px",
              }}
            >
              <Card.Link
                href={user.userId + "/" + tab + "/" + user.id}
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                View Detail
              </Card.Link>
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
