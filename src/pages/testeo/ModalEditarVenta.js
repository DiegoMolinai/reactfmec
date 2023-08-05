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
  Checkbox,
  FormControlLabel,
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
      (prod) => prod._id === productoSeleccionado
    );
    if (producto) {
      setProductosVenta([...productosVenta, producto]);
    }
  };
  
  const handleQuitarProducto = (productoId) => {
    const nuevosProductos = productosVenta.filter(
      (prod) => prod._id !== productoId
    );
    setProductosVenta(nuevosProductos);
  };
  
  const handleAgregarServicio = () => {
    const servicio = serviciosDisponibles.find(
      (serv) => serv._id === servicioSeleccionado
    );
    if (servicio) {
      setServiciosVenta([...serviciosVenta, servicio]);
    }
  };
  
  const handleQuitarServicio = (servicioId) => {
    const nuevosServicios = serviciosVenta.filter(
      (serv) => serv._id !== servicioId
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

      fetch(`http://localhost:9000/api/ventas/${venta._id}`, {
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
        <FormControlLabel
          control={
            <Checkbox
              checked={estaTerminada}
              onChange={(e) => setEstaTerminada(e.target.checked)}
            />
          }
          label="Terminada"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={estaPagada}
              onChange={(e) => setEstaPagada(e.target.checked)}
            />
          }
          label="Pagada"
        />
        <TableContainer component={Paper} style={{background:"lightcoral", border:"3px solid black"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight:"bold"}}>Productos</TableCell>
                <TableCell align="right" style={{fontWeight:"bold"}}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productosVenta.map((producto) => (
                <TableRow key={producto._id}>
                  <TableCell style={{fontWeight:"bold"}}>{producto.nombre}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleQuitarProducto(producto._id)}
                      style={{fontWeight:"bold"}}
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
          <InputLabel id="producto-label">Producto</InputLabel>
          <Select
            labelId="producto-label"
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            {productosDisponibles.map((producto) => (
              <MenuItem key={producto._id} value={producto._id}>
                {producto.nombre}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleAgregarProducto} style={{border:"3px solid black"}}>Agregar Producto</Button>
        </FormControl>
        <TableContainer component={Paper} style={{background:"lightgreen", border:"3px solid black"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight:"bold"}}>Servicios</TableCell>
                <TableCell align="right" style={{fontWeight:"bold"}}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviciosVenta.map((servicio) => (
                <TableRow key={servicio._id}>
                  <TableCell style={{fontWeight:"bold"}}>{servicio.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleQuitarServicio(servicio._id)}
                      style={{fontWeight:"bold"}}
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
          <InputLabel id="servicio-label">Servicio</InputLabel>
          <Select
            labelId="servicio-label"
            value={servicioSeleccionado}
            onChange={(e) => setServicioSeleccionado(e.target.value)}
          >
            {serviciosDisponibles.map((servicio) => (
              <MenuItem key={servicio._id} value={servicio._id}>
                {servicio.name}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleAgregarServicio} style={{border:"3px solid black"}}>Agregar Servicio</Button>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleGuardarClick}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditarVenta;
