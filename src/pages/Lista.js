import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { faker } from "@faker-js/faker";

const Lista = ({ numberOfItems = 100 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Generar una lista de elementos aleatorios en la carga inicial del componente
  useEffect(() => {
    const items = Array.from({ length: numberOfItems }, () =>
      faker.commerce.productName()
    );
    setAllItems(items);
    setVisibleItems(items.slice(0, 100)); // Mostrar los primeros 10 elementos en la lista
  }, [numberOfItems]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filtrar la lista completa de elementos según el término de búsqueda
    const filteredItems = allItems.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Actualizar la lista de elementos visibles
    setVisibleItems(filteredItems.slice(0, 10)); // Mostrar los primeros 10 elementos en la lista
    setSelectedIndex(null);
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleItemSelected = (index) => {
    setSelectedIndex(index);
  };
  return (
    <Container style={{marginTop:"1vh"}}>
      <Row>
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
        <Col xs={12} md={4}>
          <ListGroup
            style={{ height: "400px", overflowY: "auto", marginTop: "10px" }}
          >
            {visibleItems.map((item, index) => (
              <ListGroup.Item
                key={index}
                active={selectedIndex === index}
                onClick={() => handleItemSelected(index)}
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={12} md={8}>
          {selectedIndex !== null && (
            <Card style={{ marginTop: "10px" }}>
              <Card.Header>Selected Item</Card.Header>
              <Card.Body>
                <Card.Title>{visibleItems[selectedIndex]}</Card.Title>
                <Card.Text>Some additional information here.</Card.Text>
                <Button variant="secondary" onClick={handleFormClose}>
                  Close
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Lista;
