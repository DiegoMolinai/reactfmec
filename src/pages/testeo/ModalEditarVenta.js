import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
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
} from '@mui/material';

const ModalEditarVenta = ({ open, onClose, venta, fetchVentas }) => {
  const [productosVenta, setProductosVenta] = useState(venta.productos || []);
  const [serviciosVenta, setServiciosVenta] = useState(venta.servicios || []);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [estaTerminada, setEstaTerminada] = useState(venta.estaTerminada);
  const [estaPagada, setEstaPagada] = useState(venta.estaPagada);
  const [fechaCreacion, setFechaCreacion] = useState(
    new Date(venta.fechaCreacion).toISOString().split('T')[0]
  );
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');

  useEffect(() => {
    const obtenerProductosDisponibles = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/productos');
        const data = await response.json();
        setProductosDisponibles(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    const obtenerServiciosDisponibles = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/servicios');
        const data = await response.json();
        setServiciosDisponibles(data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    obtenerProductosDisponibles();
    obtenerServiciosDisponibles();
  }, []);

  const handleAgregarProducto = () => {
    const producto = productosDisponibles.find(
      (prod) => prod.id === productoSeleccionado
    );
    if (producto) {
      setProductosVenta([...productosVenta, producto]);
    }
  };

  const handleQuitarProducto = (productoId) => {
    const nuevosProductos = productosVenta.filter(
      (prod) => prod.id !== productoId
    );
    setProductosVenta(nuevosProductos);
  };

  const handleAgregarServicio = () => {
    const servicio = serviciosDisponibles.find(
      (serv) => serv.id === servicioSeleccionado
    );
    if (servicio) {
      setServiciosVenta([...serviciosVenta, servicio]);
    }
  };

  const handleQuitarServicio = (servicioId) => {
    const nuevosServicios = serviciosVenta.filter(
      (serv) => serv.id !== servicioId
    );
    setServiciosVenta(nuevosServicios);
  };

  const handleGuardarClick = () => {
    try {
      const ventaActualizada = {
        ...venta,
        productos: productosVenta,
        servicios: serviciosVenta,
        estaTerminada,
        estaPagada,
        fechaCreacion: new Date(fechaCreacion),
      };

      fetch(`http://localhost:9000/api/ventas/${venta.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ventaActualizada),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Venta actualizada:', data);
          onClose();
          fetchVentas();
        })
        .catch((error) => {
          console.error('Error al actualizar la venta:', error);
        });
    } catch (error) {
      console.error('Error al guardar la venta:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Venta</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Fecha de Creación"
          type="date"
          value={fechaCreacion}
          onChange={(e) => setFechaCreacion(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Productos</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productosVenta.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleQuitarProducto(producto.id)}
                    >
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FormControl fullWidth margin="dense">
          <InputLabel id="producto-label">Agregar Producto</InputLabel>
          <Select
            labelId="producto-label"
            id="producto-select"
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            {productosDisponibles.map((producto) => (
              <MenuItem key={producto.id} value={producto.id}>
                {producto.name} {/* Actualizamos aquí para usar 'name' */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleAgregarProducto}>Agregar Producto</Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Servicios</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviciosVenta.map((servicio) => (
                <TableRow key={servicio.id}>
                  <TableCell>{servicio.name} {/* Actualizamos aquí para usar 'name' */}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleQuitarServicio(servicio.id)}
                    >
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FormControl fullWidth margin="dense">
          <InputLabel id="servicio-label">Agregar Servicio</InputLabel>
          <Select
            labelId="servicio-label"
            id="servicio-select"
            value={servicioSeleccionado}
            onChange={(e) => setServicioSeleccionado(e.target.value)}
          >
            {serviciosDisponibles.map((servicio) => (
              <MenuItem key={servicio.id} value={servicio.id}>
                {servicio.name} {/* Actualizamos aquí para usar 'name' */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleAgregarServicio}>Agregar Servicio</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleGuardarClick}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditarVenta;
