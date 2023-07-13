import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, MenuItem, Modal, Fade } from "@mui/material";

const ServiceForm = ({ isOpen, onClose, onAddService, onUpdateService, selectedService }) => {
  const [serviceName, setServiceName] = useState("");
  const [idCambio, setIdCambio] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [productos, setProductos] = useState([]);
  const [selectedProductos, setSelectedProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedService) {
      setServiceName(selectedService.name);
      setIdCambio(selectedService.idCambio);
      setTipo(selectedService.tipo);
      setDescripcion(selectedService.descripcion);
      setSelectedProductos(selectedService.productos);
    }
  }, [selectedService]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const service = {
      name: serviceName,
      idCambio: parseInt(idCambio),
      tipo,
      descripcion,
      productos: selectedProductos.map((product) => product._id),
    };

    if (selectedService) {
      onUpdateService(service);
    } else {
      onAddService(service);
    }

    // Resetear los campos del formulario
    setServiceName("");
    setIdCambio("");
    setTipo("");
    setDescripcion("");
    setSelectedProductos([]);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Fade in={isOpen}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxWidth: "90%",
            maxHeight: "90%",
            overflow: "auto",
            backgroundColor: "#fff",
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
            padding: "20px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="serviceName"
              label="Nombre del servicio"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="idCambio"
              label="ID de cambio"
              value={idCambio}
              onChange={(e) => setIdCambio(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="tipo"
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="descripcion"
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              select
              fullWidth
              id="productos"
              label="Productos"
              value={selectedProductos}
              onChange={(e) => setSelectedProductos(e.target.value)}
            >
              {productos.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary">
              {selectedService ? 'Actualizar' : 'Añadir'}
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ServiceForm;
