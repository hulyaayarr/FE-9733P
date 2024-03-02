import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { getCount, useFavoritesStore } from "../../../stores/favorites-store";
import { useEffect } from "react";

const NavbarComponent = () => {
  const count = useFavoritesStore(getCount);

  useEffect(() => {}, [count]);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <p>Favorites Count: {count}</p>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
