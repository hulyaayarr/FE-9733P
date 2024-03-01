import { IoMdHeart } from "react-icons/io";

const LikeButton = ({
  liked,
  onClick,
}: {
  liked: boolean;
  onClick: () => void;
}) => {
  const handleButtonClick = () => {
    onClick();
  };
  return (
    <button onClick={handleButtonClick}>
      <IoMdHeart
        fill={liked ? "red" : "transparent"}
        stroke={liked ? "tranparent" : "black"}
        strokeWidth={20}
      />
    </button>
  );
};

export default LikeButton;
