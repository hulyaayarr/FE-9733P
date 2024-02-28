import Card from "react-bootstrap/Card";
import { userPost } from "../Types/user";

export default function TablistCard({ user }: { user: userPost }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          User Id:{user.userId}
          <br />
          Id:{user.id};
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.title}</Card.Subtitle>
        <Card.Text>{user.body}</Card.Text>

        <Card.Link href={user.userId + "/posts/" + user.id}>
          Go to Posts
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
