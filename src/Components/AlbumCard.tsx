import Card from "react-bootstrap/Card";
import { AlbumType } from "../Types/albumType";
export default function UserCards({ album }: { album: AlbumType }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          Album id:{album.id}. &nbsp; User id:{album.userId}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{album.title}</Card.Subtitle>

        <Card.Link href={"users/" + album.userId}>Card Link</Card.Link>
      </Card.Body>
    </Card>
  );
}
