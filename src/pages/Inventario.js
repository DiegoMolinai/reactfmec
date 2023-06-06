import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  Container,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import { faker } from "@faker-js/faker";

const Inventario = ({ numberOfItems = 100 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [prevSelectedIndex, setPrevSelectedIndex] = useState(null);

  // Generar una lista de elementos aleatorios en la carga inicial del componente
  useEffect(() => {
    const items = Array.from({ length: numberOfItems }, () => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      quantity: faker.datatype.number({ min: 0, max: 100 }),
      category: faker.commerce.department(),
    }));
    setAllItems(items);
    setVisibleItems(items.slice(0, 100)); // Mostrar los primeros 10 elementos en la lista
  }, [numberOfItems]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filtrar la lista completa de elementos según el término de búsqueda
    const filteredItems = allItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Actualizar la lista de elementos visibles
    setVisibleItems(filteredItems.slice(0, 100)); // Mostrar los primeros 10 elementos en la lista
    setSelectedIndex(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedIndex(null);
  };

  const handleItemSelected = (index) => {
    setSelectedIndex(index);
    if (index === prevSelectedIndex) {
      setSelectedIndex(null);
      setPrevSelectedIndex(null);
    } else {
      setPrevSelectedIndex(index);
    }
  };

  const handleCloseCard = () => {
    setSelectedIndex(null);
    setPrevSelectedIndex(null);
  };

  return (
    <Container style={{ marginTop: "1vh" }}>
      <Row className="justify-content-center" style={{ marginBottom: "1vh" }}>
        <Col xs={6} md={6}>
          <div className="d-flex justify-content-between">
            <Button>Boton1</Button>
            <Button>Boton2</Button>
            <Button>Boton3</Button>
          </div>
        </Col>
        <Col>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={12} style={{ maxHeight: "50vh", overflowY: "auto", marginTop: "10px" }}>
          <Table
            striped
            bordered
            hover
          >
            <thead>
              <tr style={{position:"sticky", top:"0", backgroundColor:"white"}}>
                <th scope="col">ID</th>
                <th scope="col">Nombre Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Categoria</th>
              </tr>
            </thead>
            <tbody>
              {visibleItems.map((item, index) => (
                <tr
                  key={index}
                  className={selectedIndex === index ? "table-primary" : ""}
                  onClick={() => handleItemSelected(index)}
                >
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        {selectedIndex !== null && (
          <Card style={{ marginTop: "10px" }}>
            <Card.Header>Selected Item</Card.Header>
            <Card.Body>
              <Card.Title>{visibleItems[selectedIndex].name}</Card.Title>
              <Card.Text>Some additional information here.</Card.Text>
              <Button variant="secondary" onClick={() => handleCloseCard()}>
                Close
              </Button>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Container>
  );
};

export default Inventario;
