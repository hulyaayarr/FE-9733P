import { useLoaderData } from "react-router-dom";
import { users } from "../Types/user";
import UserCards from "../Components/UserCards";
import { FetchData } from "../function/FetchData";

export async function loader() {
  return FetchData("https://jsonplaceholder.typicode.com/users/");
}

export default function AllUsers() {
  //@ts-expect-error unknown
  const userInfo: users = useLoaderData();

  return (
    <>
      <h1>Users</h1>

      {userInfo.map((user) => (
        <UserCards key={user.id} user={user} />
      ))}
    </>
  );
}
