import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

const ModalAgregarVenta = ({ open, onClose }) => {
  const [idVentas, setIdVentas] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [estaTerminada, setEstaTerminada] = useState(false);
  const [estaPagada, setEstaPagada] = useState(false);
  const [productos, setProductos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  useEffect(() => {
    // Realiza la llamada a la API para obtener los servicios disponibles
    fetch('http://localhost:9000/api/servicios')
      .then((response) => response.json())
      .then((data) => {
        setServicios(data);
      })
      .catch((error) => {
        console.error('Error al obtener los servicios:', error);
      });

    // Realiza la llamada a la API para obtener los productos disponibles
    fetch('http://localhost:9000/api/productos')
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  const handleSubmit = () => {
    const nuevaVenta = {
      idVentas: idVentas,
      fechaCreacion: fechaCreacion,
      estaTerminada: estaTerminada,
      estaPagada: estaPagada,
      productos: productosSeleccionados,
      servicios: serviciosSeleccionados,
    };

    fetch('http://localhost:9000/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaVenta),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Venta agregada:', data);
        onClose();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Venta</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="idVentas"
          label="ID Ventas"
          type="number"
          fullWidth
          value={idVentas}
          onChange={(e) => setIdVentas(e.target.value)}
        />
        <TextField
          margin="dense"
          id="fechaCreacion"
          label="Fecha de Creación"
          type="date"
          fullWidth
          value={fechaCreacion}
          onChange={(e) => setFechaCreacion(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="productos-label">Productos</InputLabel>
          <Select
            labelId="productos-label"
            id="productos-select"
            multiple
            value={productosSeleccionados}
            onChange={(e) => setProductosSeleccionados(e.target.value)}
            renderValue={(selected) => selected.map((producto) => producto.nombre).join(', ')}
          >
            {productos.map((producto) => (
              <MenuItem key={producto._id} value={producto}>
                <Checkbox checked={productosSeleccionados.includes(producto)} />
                <ListItemText primary={producto.nombre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="servicios-label">Servicios</InputLabel>
          <Select
            labelId="servicios-label"
            id="servicios-select"
            multiple
            value={serviciosSeleccionados}
            onChange={(e) => setServiciosSeleccionados(e.target.value)}
            renderValue={(selected) => selected.map((servicio) => servicio.name).join(', ')}
          >
            {servicios.map((servicio) => (
              <MenuItem key={servicio._id} value={servicio}>
                <Checkbox checked={serviciosSeleccionados.includes(servicio)} />
                <ListItemText primary={servicio.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Agregar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAgregarVenta;
