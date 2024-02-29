import { Link, useLoaderData } from "react-router-dom";
import { FetchData } from "../function/FetchData";

import CommentCards from "../Components/CommentCards";
import { User } from "../Types/user";
import { commentType } from "../Types/comments";

interface PageData {
  user: User;
  comment: commentType[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loader = async ({ params }: { params: any }) => {
  const { userId, postId } = params;

  const userData: User = await FetchData(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  const commentData: commentType = await FetchData(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  return {
    user: userData,
    comment: commentData,
  };
};

export const UserPostPage = () => {
  const pageData = useLoaderData() as PageData;

  return (
    <div>
      <h2>User Name</h2>
      <Link to={"/users/" + pageData.user.id}>{pageData.user?.username}</Link>;
      <h2>Comments</h2>
      {pageData &&
        pageData.comment &&
        pageData.comment.map((com) => (
          <CommentCards key={com.id} comment={com} />
        ))}
    </div>
  );
};
