import Card from "react-bootstrap/Card";
import { commentType } from "../Types/comments";

export default function UserCards({ comment }: { comment: commentType }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          Post Id:{comment.postId}
          <br />
          Comment Id:{comment.id}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {comment.email}
        </Card.Subtitle>
        <Card.Text>{comment.name}</Card.Text>

        <Card.Text>{comment.body}</Card.Text>
      </Card.Body>
    </Card>
  );
}
