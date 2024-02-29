import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../Types/user";
import { TabList } from "../Components/Tablist";
import { FetchData } from "../function/FetchData";

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const params = useParams();
  const userId = params.userId;
  async function getUser() {
    const data = await FetchData(
      "https://jsonplaceholder.typicode.com/users/" + userId
    );

    setUser(data);
  }
  useEffect(() => {
    getUser();
  }, []);
  console.log({ user });
  return <div>{userId && <TabList userId={userId} />}</div>;
};

export default UserPage;
