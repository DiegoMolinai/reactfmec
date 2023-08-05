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
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const ModalAgregarVenta = ({ open, onClose }) => {
  const [productosVenta, setProductosVenta] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [serviciosVenta, setServiciosVenta] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [estaTerminada, setEstaTerminada] = useState(false);
  const [estaPagada, setEstaPagada] = useState(false);
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadProducto, setCantidadProducto] = useState(1);
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [busquedaServicio, setBusquedaServicio] = useState("");

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

  const handleAgregarProducto = () => {
    if (productoSeleccionado) {
      const producto = {
        ...productoSeleccionado,
        cantidad: cantidadProducto,
      };
      setProductosVenta([...productosVenta, producto]);
      setProductoSeleccionado(null);
      setCantidadProducto(1);
      setBusquedaProducto("");
    }
  };

  const handleAgregarServicio = () => {
    if (servicioSeleccionado) {
      setServiciosVenta([...serviciosVenta, servicioSeleccionado]);
      setServicioSeleccionado(null);
      setBusquedaServicio("");
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

  const handleGuardarClick = async () => {
    try {
      const nuevaVenta = {
        productos: productosVenta,
        servicios: serviciosVenta,
        estaTerminada,
        estaPagada,
        fechaCreacion: fechaCreacion !== "" ? new Date(fechaCreacion) : null,
      };

      const response = await fetch("http://localhost:9000/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaVenta),
      });

      if (response.ok) {
        console.log("Venta guardada correctamente");
        onClose();
      } else {
        console.error("Error al guardar la venta:", response.statusText);
        onClose();
      }
    } catch (error) {
      console.error("Error al guardar la venta:", error);
    }
  };

  const filteredProductos = productosDisponibles.filter((producto) =>
    producto.nombre.toLowerCase().includes(busquedaProducto.toLowerCase())
  );

  const filteredServicios = serviciosDisponibles.filter((servicio) =>
    servicio.name.toLowerCase().includes(busquedaServicio.toLowerCase())
  );

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
        <div style={{ display: "flex", alignItems: "center", paddingTop:"1%", paddingBottom:"1%"}}>
  <FormControlLabel
    control={
      <Checkbox
        checked={estaTerminada}
        onChange={(e) => setEstaTerminada(e.target.checked)}
        sx={{ marginRight: "10px", transform: "scale(1.5)" }}
      />
    }
    label="Venta terminada"
  />
  <FormControlLabel
    control={
      <Checkbox
        checked={estaPagada}
        onChange={(e) => setEstaPagada(e.target.checked)}
        sx={{ marginRight: "10px", transform: "scale(1.5)" }}
      />
    }
    label="Venta pagada"
  />
</div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormControl sx={{ width: "60%" }} margin="dense">
            <InputLabel id="producto-label" shrink>
              Seleccionar Producto
            </InputLabel>
            <Select
              labelId="producto-label"
              id="producto-select"
              value={productoSeleccionado ? productoSeleccionado.id : ""}
              onChange={(e) => {
                const productoId = e.target.value;
                const producto = productosDisponibles.find(
                  (prod) => prod.id === productoId
                );
                setProductoSeleccionado(producto);
              }}
              displayEmpty
              renderValue={() =>
                productoSeleccionado
                  ? productoSeleccionado.nombre
                  : "Seleccionar Producto"
              }
            >
              <MenuItem value="" disabled>
                <em>Seleccionar Producto</em>
              </MenuItem>
              {filteredProductos.slice(0, 10).map((producto) => (
                <MenuItem key={producto.id} value={producto.id}>
                  {producto.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "20%" }} margin="dense">
            <InputLabel id="cantidad-label" shrink>
              Cantidad
            </InputLabel>
            <Select
              labelId="cantidad-label"
              id="cantidad-select"
              value={cantidadProducto}
              onChange={(e) => setCantidadProducto(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cantidad) => (
                <MenuItem key={cantidad} value={cantidad}>
                  {cantidad}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAgregarProducto}>
            Agregar Producto
          </Button>
        </Box>
        <TextField
          fullWidth
          margin="dense"
          label="Buscar Servicio"
          value={busquedaServicio}
          onChange={(e) => setBusquedaServicio(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="servicio-label" shrink>
            Agregar Servicio
          </InputLabel>
          <Select
            labelId="servicio-label"
            id="servicio-select"
            value={servicioSeleccionado ? servicioSeleccionado.id : ""}
            onChange={(e) => {
              const servicioId = e.target.value;
              const servicio = serviciosDisponibles.find(
                (serv) => serv.id === servicioId
              );
              setServicioSeleccionado(servicio);
            }}
            displayEmpty
            renderValue={() =>
              servicioSeleccionado ? servicioSeleccionado.name : "Seleccionar Servicio"
            }
          >
            <MenuItem value="" disabled>
              <em>Seleccionar Servicio</em>
            </MenuItem>
            {filteredServicios.slice(0, 10).map((servicio) => (
              <MenuItem key={servicio.id} value={servicio.id}>
                {servicio.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAgregarServicio}>
          Agregar Servicio
        </Button>
        <Table component={Paper} style={{ width: "100%", marginTop: 20 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productosVenta.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell align="right">{producto.cantidad}</TableCell>
                <TableCell align="right">{producto.precio}</TableCell>
                <TableCell align="right">
                  {producto.cantidad * producto.precio}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => handleQuitarProducto(producto.id)}
                  >
                    Quitar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table component={Paper} style={{ width: "100%", marginTop: 20 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviciosVenta.map((servicio) => (
              <TableRow key={servicio.id}>
                <TableCell>{servicio.name}</TableCell>
                <TableCell align="right">{servicio.precio}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => handleQuitarServicio(servicio.id)}
                  >
                    Quitar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          onClick={handleGuardarClick}
          style={{ marginTop: 20 }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalAgregarVenta;
