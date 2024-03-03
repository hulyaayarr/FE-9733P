import Card from "react-bootstrap/Card";
import { User } from "../Types/user";
import { Button } from "react-bootstrap";

export default function UserCards({ user }: { user: User }) {
  return (
    <Card style={{ height: "20rem", border: "none" }}>
      <Card.Body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="text-center">
          <img
            src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            alt=""
            className="img-fluid rounded-circle"
            style={{
              width: "50%",
              border: "2px dotted #b2acf3",
              marginBottom: "25px",
            }}
          />

          <Card.Subtitle className="mb-2  text-muted">
            <div className="fs-5">@{user.username}</div>

            <div className=" mt-2">{user.name}</div>
          </Card.Subtitle>

          <Button
            style={{
              backgroundColor: "rgb(178,172,243)",
              marginTop: "10px",
              border: "none",
            }}
          >
            <Card.Link
              href={"/users/" + user.id}
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
              View Profile
            </Card.Link>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
