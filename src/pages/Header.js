import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" style={{backgroundColor:"#222f3e"}}>
      <Navbar.Brand href="/"style={{color:"white"}}>
      <h1>FMEC</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{color:"white"}}>
          <Nav.Link href="/Ventas"style={{color:"white"}}><h2>Ventas</h2></Nav.Link>
          <Nav.Link href="/Inventario"style={{color:"white"}}><h2>Inventario</h2></Nav.Link>
          <Nav.Link href="/Reportes"style={{color:"white"}}><h2>Reportes</h2></Nav.Link>
          <Nav.Link href="/Admin"style={{color:"white"}}><h2>Admin</h2></Nav.Link>
          <Nav.Link href="/Servicios"style={{color:"white"}}><h2>Servicios</h2></Nav.Link>
          <Nav.Link href="/Revision"style={{color:"white"}}><h2>Revision</h2></Nav.Link>
          <Nav.Link href="/Recibir"style={{color:"white"}}><h2>Recibir Solicitud</h2></Nav.Link>
          <Nav.Link href="/Notificaciones"style={{color:"white"}}><h2>Notificaciones</h2></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;