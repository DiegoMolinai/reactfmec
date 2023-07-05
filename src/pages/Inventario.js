import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table, Pagination, Container } from "react-bootstrap";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";

const Inventario = () => {
  const [allItems, setAllItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newProductData, setNewProductData] = useState({
    nombre: "",
    precio: "",
    tipo: "",
    fecha: "",
    cantidad: "",
    categoria: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  useEffect(() => {
    fetch("http://localhost:9000/api/productos")
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

  const handleView = (item) => {
    setSelectedItem(item);
    handleShow();
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    handleShowEdit();
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    handleShowDelete();
  };

  const handleAddProduct = () => {
    fetch("http://localhost:9000/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductData),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedItems = [...allItems, data];
        setAllItems(updatedItems);
        setVisibleItems(
          updatedItems.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
        handleCloseAdd();
      })
      .catch((error) => console.log(error));
  };

  const saveChanges = () => {
    fetch(`http://localhost:9000/api/productos/${selectedItem._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedItems = allItems.map((item) =>
          item._id === data._id ? data : item
        );
        setAllItems(updatedItems);
        setVisibleItems(
          updatedItems.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
        handleCloseEdit();
      })
      .catch((error) => console.log(error));
  };

  const deleteItem = () => {
    fetch(`http://localhost:9000/api/productos/${selectedItem._id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedItems = allItems.filter(
          (item) => item._id !== selectedItem._id
        );
        setAllItems(updatedItems);

        const updatedVisibleItems = updatedItems.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );
        setVisibleItems(updatedVisibleItems);

        if (updatedVisibleItems.length === 0 && currentPage > 1) {
          handlePageChange(currentPage - 1);
        }

        handleCloseDelete();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
<div className="d-flex justify-content-between align-items-center">
        <h2>Inventario</h2>
        <Button variant="primary" onClick={handleShowAdd}>
          <Add />
          Agregar Producto
        </Button>
      </div>
      <Table striped bordered hover style={{ marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#ffe6e6", fontWeight: "bold" }}>
            <th>
              ID
            </th>
            <th>
              Nombre Producto
            </th>
            <th>
              Precio
            </th>
            <th>
              Tipo
            </th>
            <th>
              Fecha
            </th>
            <th>
              Cantidad
            </th>
            <th>
              Categoría
            </th>
            <th>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item, index) => (
            <tr
              key={index}
              style={{ backgroundColor: "rgba(220, 220, 220, 0.5)" }}
            >
              <td>{index + 1}</td>
              <td>{item.nombre}</td>
              <td>
                {item.precio.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </td>
              <td>{item.tipo}</td>
              <td>{item.fecha}</td>
              <td>{item.cantidad}</td>
              <td>{item.categoria}</td>
              <td>
                <Button
                  variant="outline-primary"
                  className="mr-2"
                  onClick={() => handleView(item)}
                >
                  <Visibility />
                </Button>
                <Button
                  variant="outline-success"
                  className="mr-2"
                  onClick={() => handleEdit(item)}
                >
                  <Edit />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(item)}
                >
                  <Delete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(Math.ceil(allItems.length / itemsPerPage))].map((_, i) => (
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
          <Modal.Title>Detalles del producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ID: {selectedItem?._id}</p>
          <p>Nombre: {selectedItem?.nombre}</p>
          <p>Precio: {selectedItem?.precio}</p>
          <p>Tipo: {selectedItem?.tipo}</p>
          <p>Fecha: {selectedItem?.fecha}</p>
          <p>Cantidad: {selectedItem?.cantidad}</p>
          <p>Categoría: {selectedItem?.categoria}</p>
        </Modal.Body>
      </Modal>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={selectedItem?.nombre}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, nombre: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                value={selectedItem?.precio}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, precio: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={selectedItem?.tipo}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, tipo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="text"
                value={selectedItem?.fecha}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, fecha: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="text"
                value={selectedItem?.cantidad}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, cantidad: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={selectedItem?.categoria}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    categoria: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteItem}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={newProductData.nombre}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    nombre: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                value={newProductData.precio}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    precio: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={newProductData.tipo}
                onChange={(e) =>
                  setNewProductData({ ...newProductData, tipo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="text"
                value={newProductData.fecha}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    fecha: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="text"
                value={newProductData.cantidad}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    cantidad: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={newProductData.categoria}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    categoria: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Inventario;