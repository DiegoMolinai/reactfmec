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
  Table,
  Dropdown,
  Modal,
  ButtonToolbar,
} from "react-bootstrap";
import { faker } from "@faker-js/faker";
import Botonbacan from "./Botonbacan";

const Inventario = ({ numberOfItems = 100 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [prevSelectedIndex, setPrevSelectedIndex] = useState(null);

  // MODALES DE BOTONES

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  // MANEJO DE MODALES MOSTRAR/ESCONDER

  const handleShowModal1 = () => setShowModal1(true);
  const handleShowModal2 = () => setShowModal2(true);
  const handleShowModal3 = () => setShowModal3(true);

  const handleCloseModal1 = () => setShowModal1(false);
  const handleCloseModal2 = () => setShowModal2(false);
  const handleCloseModal3 = () => setShowModal3(false);

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

  //------------------------------------------------------------------
  //------------------------------------------------------------------
  //------------------------------------------------------------------

  //BOTON PARA VENDER

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
    setShowForm(!showForm);
  };

  const handleCloseModal = () => {
    setSelectedProducts([]);
    setShowForm(false);
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor
    console.log(formData);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar el formulario
    handleShowModal();
  };

  //------------------------------------------------------------------
  //------------------------------------------------------------------
  //------------------------------------------------------------------
  //------------------------------------------------------------------

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelect = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleBuyClick = () => {
    // hacer algo con los productos seleccionados, por ejemplo, enviar una solicitud al servidor
    alert(
      `Compraste los siguientes productos: ${selectedProducts
        .map((p) => p.name)
        .join(", ")}`
    );
    // limpiar selección
    setSelectedProducts([]);
  };

  const productList = [
    { id: 1, name: "Producto 1", price: 10 },
    { id: 2, name: "Producto 2", price: 20 },
    { id: 3, name: "Producto 3", price: 30 },
    { id: 4, name: "Producto 4", price: 40 },
  ];
  return (
    <Container style={{ marginTop: "1vh" }}>
      <hr></hr>
      <ButtonToolbar className="d-flex justify-content-center">
        <Button variant="primary" onClick={handleShowModal}>
          Agregar Productos
        </Button>
        <Button variant="secondary">Agregar Servicios</Button>
        <Button variant="success">Buscar Producto o Servicio</Button>
      </ButtonToolbar>

      <hr></hr>
      <Modal
        show={showModal}
        onHide={handleShowModal}
        size="lg"
        onExited={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Formulario de venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showForm && (
            <Row>
              <h1>Lista de Productos</h1>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ingresa tu email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formMessage">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Selecciona un producto
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {productList.map((product) => (
                    <Dropdown.Item
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                    >
                      {product.name} - ${product.price}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <ListGroup className="mt-3">
                {selectedProducts.map((product) => (
                  <ListGroup.Item key={product.id}>
                    {product.name} - ${product.price}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button
                variant="primary"
                onClick={handleBuyClick}
                disabled={selectedProducts.length === 0}
              >
                Comprar ({selectedProducts.length})
              </Button>
              <Button variant="secondary" onClick={handleShowModal}>
                Cancelar
              </Button>
            </Row>
          )}
        </Modal.Body>
      </Modal>

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
        <Col
          xs={12}
          md={12}
          style={{ maxHeight: "50vh", overflowY: "auto", marginTop: "10px" }}
        >
          <Table striped bordered hover>
            <thead>
              <tr
                style={{
                  position: "sticky",
                  top: "0",
                  backgroundColor: "cyan",
                }}
              >
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
