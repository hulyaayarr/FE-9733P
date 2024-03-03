import { useLoaderData } from "react-router-dom";
import { users } from "../Types/user";
import UserCards from "../Components/UserCards";
import { FetchData } from "../function/FetchData";
import { Container, Col, Row } from "react-bootstrap";

export async function loader() {
  return FetchData("https://jsonplaceholder.typicode.com/users/");
}

export default function AllUsers() {
  //@ts-expect-error unknown
  const userInfo: users = useLoaderData();

  return (
    <>
      <Container>
        <Row>
          <h1 className=" ps-4 px-5 gy-4">Users</h1>
          {userInfo.map((user) => (
            <Col
              key={user.id}
              sm={12}
              md={6}
              xl={3}
              className="d-flex ps-4 px-5 gy-4 justify-content-center"
            >
              <UserCards user={user} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
