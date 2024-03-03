import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TabList } from "../Components/Tablist";
import { FetchData } from "../function/FetchData";
import { User } from "../Types/user";
import { Container, Row } from "react-bootstrap";

const UserPage = () => {
  const [userData, setUserData] = useState<User | null>(null);

  const params = useParams();
  const userId = params.userId;
  async function getUser() {
    const userData = await FetchData(
      "https://jsonplaceholder.typicode.com/users/" + userId
    );
    setUserData(userData);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Row>
        {" "}
        <h1 className="fs-1 my-5">@{userData?.username}</h1>
      </Row>
      <Row>{userId && <TabList userId={userId} />}</Row>
    </Container>
  );
};

export default UserPage;
