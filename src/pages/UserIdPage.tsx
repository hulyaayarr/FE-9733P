import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../Types/user";
import { TabListComponent } from "./TablistPage";

const UserIdPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const params = useParams();
  const userId = params.userId;
  async function getUser() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/" + userId
    );
    const data = await response.json();

    setUser(data);
  }
  useEffect(() => {
    getUser();
  }, []);
  return <div>{userId && <TabListComponent userId={userId} />}</div>;
};

export default UserIdPage;
