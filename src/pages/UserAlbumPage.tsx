import { Link, useLoaderData } from "react-router-dom";
import { FetchData } from "../function/FetchData";
import { User } from "../Types/user";
import { AlbumType } from "../Types/albumType";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import LikeButton from "../Components/LikeButton";
import { useFavoritesStore } from "../../stores/favorites-store";

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

  return (
    <Container>
      <Row>
        <Link
          to={"/users/" + pageData.user.id}
          className="fs-2 d-flex justify-content-center my-4"
          style={{
            textDecoration: "none",
            color: "#000",
          }}
        >
          @{pageData.user?.username}
        </Link>
      </Row>

      <Row>
        {pageData &&
          pageData.photo &&
          pageData.photo.map((old) => {
            const liked = !!likedAlbums.find((a) => a.photoId === old.id);
            return (
              <Col className="d-flex justify-content-center my-3" key={old.id}>
                <Card style={{ width: "18rem", height: "22rem" }}>
                  <Card.Body>
                    <Card.Title>{old.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {old.title}
                    </Card.Subtitle>
                    <Image
                      src={old.url}
                      alt={old.title}
                      thumbnail
                      style={{
                        height: "200px",
                        textAlign: "center",
                      }}
                    />
                  </Card.Body>
                </Card>
                <div>
                  <Button variant="light" className="d-flex">
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
                </div>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};
