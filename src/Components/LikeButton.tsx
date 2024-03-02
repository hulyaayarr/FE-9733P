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
    <div onClick={handleButtonClick}>
      <IoMdHeart
        fill={liked ? "red" : "transparent"}
        stroke={liked ? "tranparent" : "black"}
        strokeWidth={20}
      />
    </div>
  );
};

export default LikeButton;
