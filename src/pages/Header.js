import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand href="/">
      <h1>FMEC</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/Ventas"><h2>Ventas</h2></Nav.Link>
          <Nav.Link href="/Inventario"><h2>Inventario</h2></Nav.Link>
          <Nav.Link href="/Reportes"><h2>Reportes</h2></Nav.Link>
          <Nav.Link href="/Login"><h2>Login</h2></Nav.Link>
          <Nav.Link href="/Lista"><h2>Lista</h2></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;