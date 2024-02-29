import React from "react";
import { IoMdHeart } from "react-icons/io";

const LikeButton = ({ liked }: { liked: boolean }) => {
  return (
    <IoMdHeart
      fill={liked ? "red" : "transparent"}
      stroke={liked ? "tranparent" : "black"}
      strokeWidth={20}
    />
  );
};

export default LikeButton;
