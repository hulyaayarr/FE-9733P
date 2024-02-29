import { useLoaderData } from "react-router-dom";
import { FetchData } from "../function/FetchData";
import { User } from "../Types/user";
import { AlbumType } from "../Types/albumType";
import AlbumCard from "../Components/AlbumCard";

interface PageData {
  user: User;
  album: AlbumType[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loader = async ({ params }: { params: any }) => {
  const { albumId, userId } = params;

  const userData = await FetchData(
    "https://jsonplaceholder.typicode.com/users/" + userId
  );
  const albumData = await FetchData(
    "https://jsonplaceholder.typicode.com/albums/" + albumId
  );

  return {
    user: userData,
    album: albumData,
  };
};

export const UserAlbumPage = () => {
  const pageData = useLoaderData() as PageData;
  return (
    <div>
      UserAlbums <br />
      {/* User: <Link to={"/users/" + userId}>{user?.username}</Link>; */}
      {pageData &&
        pageData.album &&
        pageData.album.map((alb) => <AlbumCard key={alb.id} album={alb} />)}
    </div>
  );
};
