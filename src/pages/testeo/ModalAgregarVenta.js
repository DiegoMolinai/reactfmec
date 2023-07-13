import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Modal,
  TextField,
} from "@mui/material";

const ModalAgregarVenta = ({ open, onClose }) => {
  const [productosVenta, setProductosVenta] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [serviciosVenta, setServiciosVenta] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [estaTerminada, setEstaTerminada] = useState(false);
  const [estaPagada, setEstaPagada] = useState(false);
  const [fechaCreacion, setFechaCreacion] = useState("");

  useEffect(() => {
    const obtenerProductosDisponibles = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/productos");
        const data = await response.json();
        setProductosDisponibles(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    const obtenerServiciosDisponibles = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/servicios");
        const data = await response.json();
        setServiciosDisponibles(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    obtenerProductosDisponibles();
    obtenerServiciosDisponibles();
  }, []);

  const handleAgregarProducto = (productoId) => {
    const producto = productosDisponibles.find(
      (prod) => prod.id === productoId
    );
    if (producto) {
      setProductosVenta([...productosVenta, producto]);
    }
  };

  const handleAgregarServicio = (servicioId) => {
    const servicio = serviciosDisponibles.find(
      (serv) => serv.id === servicioId
    );
    if (servicio) {
      setServiciosVenta([...serviciosVenta, servicio]);
    }
  };

  const handleQuitarProducto = (productoId) => {
    const nuevosProductos = productosVenta.filter(
      (prod) => prod.id !== productoId
    );
    setProductosVenta(nuevosProductos);
  };

  const handleQuitarServicio = (servicioId) => {
    const nuevosServicios = serviciosVenta.filter(
      (serv) => serv.id !== servicioId
    );
    setServiciosVenta(nuevosServicios);
  };

  const handleGuardarClick = () => {
    try {
      const nuevaVenta = {
        productos: productosVenta,
        servicios: serviciosVenta,
        estaTerminada,
        estaPagada,
        fechaCreacion: new Date(fechaCreacion),
      };

      // Lógica para guardar la venta en el servidor
      console.log("Nueva venta:", nuevaVenta);

      onClose();
    } catch (error) {
      console.error("Error al guardar la venta:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Agregar Venta
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          label="Fecha de Creación"
          type="date"
          value={fechaCreacion}
          onChange={(e) => setFechaCreacion(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="producto-label">Agregar Producto</InputLabel>
          <Select
            labelId="producto-label"
            id="producto-select"
            value=""
            onChange={(e) => handleAgregarProducto(e.target.value)}
          >
            <MenuItem value="" disabled>
              Seleccionar Producto
            </MenuItem>
            {productosDisponibles.map((producto) => (
              <MenuItem key={producto.id} value={producto.id}>
                {producto.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="servicio-label">Agregar Servicio</InputLabel>
          <Select
            labelId="servicio-label"
            id="servicio-select"
            value=""
            onChange={(e) => handleAgregarServicio(e.target.value)}
          >
            <MenuItem value="" disabled>
              Seleccionar Servicio
            </MenuItem>
            {serviciosDisponibles.map((servicio) => (
              <MenuItem key={servicio.id} value={servicio.id}>
                {servicio.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h6" component="h2" gutterBottom>
  Productos
</Typography>
<TableContainer component={Paper} sx={{ maxHeight: 200, marginBottom: '16px' }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Producto</TableCell>
        <TableCell>Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
              {productosVenta.map((producto) => (
                <TableRow key={producto.id} sx={{ backgroundColor: "#ccffcc" }}>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleQuitarProducto(producto.id)}>
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h6" component="h2" gutterBottom>
  Servicios
</Typography>
<TableContainer component={Paper} sx={{ maxHeight: 200, marginBottom: '16px' }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Servicio</TableCell>
        <TableCell>Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
              {serviciosVenta.map((servicio) => (
                <TableRow key={servicio.id} sx={{ backgroundColor: "#ccffff" }}>
                  <TableCell>{servicio.name}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleQuitarServicio(servicio.id)}>
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleGuardarClick}>Guardar</Button>
      </Box>
    </Modal>
  );
};

export default ModalAgregarVenta;
