import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { getCount, useFavoritesStore } from "../../../stores/favorites-store";
import { useEffect } from "react";
import { GrFavorite } from "react-icons/gr";

const NavbarComponent = () => {
  const count = useFavoritesStore(getCount);

  useEffect(() => {}, [count]);
  return (
    <Navbar expand="lg">
      <Container
        className="rounded-pill  ps-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgb(178,172,243)",
        }}
      >
        <Navbar.Brand href="/">
          <img
            src="/src/assets/logo22.png"
            alt="brand-logo"
            className="img-fluid rounded
            "
            style={{
              height: "50px",
              color: "#FFF",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" me-auto fs-5 ">
            <div className="d-flex justify-content-between">
              <Nav.Link href="/" className="text-white">
                Users
              </Nav.Link>
              <Nav.Link className="text-white" href="/posts">
                All Posts
              </Nav.Link>

              <Nav.Link className="text-white" href="/favorites">
                Favorites
              </Nav.Link>
              <Nav.Link className="text-white" href="/favorites">
                <div
                  className="position-relative pe-5 
                "
                >
                  <GrFavorite />
                  <span
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      display: "inline-block",
                      position: "absolute",
                      bottom: "10px",
                      left: "25px",
                      fontSize: "16px",
                      opacity: "70%",
                    }}
                  >
                    {count}
                  </span>
                </div>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
