import { Link, useLoaderData } from "react-router-dom";
import { FetchData } from "../function/FetchData";

import CommentCards from "../Components/CommentCards";
import { User } from "../Types/user";
import { commentType } from "../Types/comments";
import { Col, Container, Row } from "react-bootstrap";

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
    <Container>
      <Row>
        <Link
          className="fs-2 my-4"
          to={"/users/" + pageData.user.id}
          style={{
            textDecoration: "none",
            color: "#000",
          }}
        >
          @{pageData.user?.username}
        </Link>
      </Row>

      <h2>Comments</h2>
      {pageData &&
        pageData.comment &&
        pageData.comment.map((com) => (
          <Col key={com.id} className="my-4">
            <CommentCards comment={com} />
          </Col>
        ))}
    </Container>
  );
};
