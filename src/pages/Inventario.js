import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Pagination } from 'react-bootstrap';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';

const Inventario = () => {
  const [allItems, setAllItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch('http://localhost:9000/api/productos')
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data);
        setVisibleItems(data.slice(0, itemsPerPage));
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    setVisibleItems(allItems.slice(startIndex, startIndex + itemsPerPage));
  };

  return (
    <div style={{ marginTop: '1vh' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Inventario</h2>
        <Button variant="primary" onClick={handleShow}>
          <Add />
          Agregar Producto
        </Button>
      </div>
      <Table striped bordered hover style={{ marginTop: '10px' }}>
        {/* Aquí va el resto de tu código JSX... */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.precio}</td>
              <td>{item.cantidad}</td>
              <td>{item.categoria}</td>
              <td>
                <Button variant="outline-primary" className="mr-2">
                  <Visibility />
                </Button>
                <Button variant="outline-success" className="mr-2">
                  <Edit />
                </Button>
                <Button variant="outline-danger">
                  <Delete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(Math.ceil(allItems.length / itemsPerPage))].map((e, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Agregar Producto</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>ID Producto</Form.Label>
        <Form.Control type="text" placeholder="Ingrese ID del producto" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nombre Producto</Form.Label>
        <Form.Control type="text" placeholder="Ingrese nombre del producto" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" placeholder="Ingrese precio del producto" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Cantidad</Form.Label>
        <Form.Control type="number" placeholder="Ingrese cantidad del producto" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Categoría</Form.Label>
        <Form.Control type="text" placeholder="Ingrese categoría del producto" />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cerrar
    </Button>
    <Button variant="primary" onClick={handleClose}>
      Guardar Cambios
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};

export default Inventario;
