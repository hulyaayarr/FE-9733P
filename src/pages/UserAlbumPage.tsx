import { Link, useLoaderData } from "react-router-dom";
import { FetchData } from "../function/FetchData";
import { User } from "../Types/user";
import { AlbumType } from "../Types/albumType";
import { Button, Card, Image } from "react-bootstrap";
import LikeButton from "../Components/LikeButton";
import { getCount, useFavoritesStore } from "../../stores/favorites-store";

interface PageData {
  user: User;
  album: AlbumType;
  photo: photoType[];
}
interface photoType {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loader = async ({ params }: { params: any }) => {
  const { userId, albumId } = params;
  const userData: User = await FetchData(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  const albumData: AlbumType = await FetchData(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  );
  const photoData: photoType[] = await FetchData(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );

  return {
    user: userData,
    album: albumData,
    photo: photoData,
  };
};

export const UserAlbumPage = () => {
  const pageData = useLoaderData() as PageData;
  const { likedAlbums, setLikedAlbums } = useFavoritesStore();
  const state = useFavoritesStore.getState();
  const count = getCount(state);

  return (
    <div>
      UserAlbums
      <a href="/favorites">favorites</a>
      <br />
      <p>Count: {count}</p>
      <br />
      <Link to={"/users/" + pageData.user.id}>{pageData.user?.username}</Link>;
      {pageData && pageData.album && (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              Album id:{pageData.album.id}. &nbsp; User id:
              {pageData.album.userId}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {pageData.album.title}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      )}
      {pageData &&
        pageData.photo &&
        pageData.photo.map((old) => {
          const liked = !!likedAlbums.find((a) => a.photoId === old.id);
          return (
            <Card key={old.id} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  Photo id:{old.id}. &nbsp; Album id:
                  {old.albumId}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {old.title}
                </Card.Subtitle>
                <Image
                  src={old.url}
                  alt={old.title}
                  thumbnail
                  style={{
                    height: "200px",
                  }}
                />
                <Button variant="light">
                  <LikeButton
                    liked={liked}
                    onClick={() => {
                      if (liked) {
                        setLikedAlbums(
                          likedAlbums.filter(
                            (album) => album.photoId !== old.id
                          )
                        );
                      } else {
                        setLikedAlbums([
                          ...likedAlbums,
                          {
                            albumId: pageData.album.id,
                            photoId: old.id,
                            id: old.id,
                            userId: pageData.user.id,
                            url: old.url,
                            title: old.title,
                            thumbnailUrl: old.thumbnailUrl,
                          },
                        ]);
                      }
                    }}
                  />
                </Button>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};
