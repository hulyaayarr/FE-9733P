import { useLoaderData } from "react-router-dom";
import { users } from "../Types/user";
import UserCards from "../Components/UserCards";

export async function loader() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/");
  const data = await response.json();

  return data;
}
export default function UsersPost() {
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
