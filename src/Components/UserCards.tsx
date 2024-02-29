import Card from "react-bootstrap/Card";
import { User } from "../Types/user";

export default function UserCards({ user }: { user: User }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          {user.id}. &nbsp;
          {user.name}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {user.username}
        </Card.Subtitle>
        <Card.Text>{user.phone}</Card.Text>
        <Card.Link href={"/users/" + user.id}>Card Link</Card.Link>
      </Card.Body>
    </Card>
  );
}
