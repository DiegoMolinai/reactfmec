import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";

const ServiceForm = ({ onAddService, onUpdateService, selectedService }) => {
  const [serviceName, setServiceName] = useState("");
  const [idCambio, setIdCambio] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [productos, setProductos] = useState([]);
  const [selectedProductos, setSelectedProductos] = useState([]);

  useEffect(() => {
    // Simular la obtención de productos desde la API
    fetch("http://localhost:9000/api/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nombre del servicio"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            label="ID de cambio"
            value={idCambio}
            onChange={(e) => setIdCambio(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Productos"
            value={selectedProductos}
            onChange={(e) => setSelectedProductos(e.target.value)}
            fullWidth
            required
            SelectProps={{
              multiple: true,
              renderValue: (selected) =>
                selected
                  .map((value) => {
                    const selectedProduct = productos.find(
                      (product) => product._id === value
                    );
                    return selectedProduct ? selectedProduct.nombre : "";
                  })
                  .join(", "),
            }}
          >
            {productos.map((product) => (
              <MenuItem key={product._id} value={product._id}>
                {product.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {selectedService ? "Editar servicio" : "Guardar servicio"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ServiceForm;
