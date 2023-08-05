import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Modal,
  Fade,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  Input,
  Typography,
  Box,
} from "@mui/material";

const ServiceForm = ({
  isOpen,
  onClose,
  onAddService,
  onUpdateService,
  selectedService,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [idCambio, setIdCambio] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [productos, setProductos] = useState([]);
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [selectedProductRows, setSelectedProductRows] = useState([]);
  const [isProductListOpen, setIsProductListOpen] = useState(false);

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
      setSelectedProductRows(selectedService.productos);
    }
  }, [selectedService]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const service = {
      name: serviceName,
      idCambio: parseInt(idCambio),
      tipo,
      descripcion,
      productos: selectedProductRows.map((product) => ({
        ...product,
        cantidad: parseInt(product.cantidad),
      })),
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
    setSelectedProductRows([]);
    onClose();
  };

  const handleProductSelection = (event) => {
    const selectedIds = Array.from(event.target.value);
    const selectedProducts = productos.filter((product) =>
      selectedIds.includes(product._id)
    );
    setSelectedProductRows((prevRows) => [
      ...prevRows,
      ...selectedProducts.map((product) => ({
        ...product,
        cantidad: 1,
      })),
    ]);
    setIsProductListOpen(false); // Cierra la lista de selección de productos
  };

  const handleRemoveSelectedProduct = (product) => {
    const updatedSelectedRows = selectedProductRows.filter(
      (row) => row._id !== product._id
    );
    setSelectedProductRows(updatedSelectedRows);
  };

  const handleQuantityChange = (event, product) => {
    const { value } = event.target;
    const updatedRows = selectedProductRows.map((row) =>
      row._id === product._id ? { ...row, cantidad: value } : row
    );
    setSelectedProductRows(updatedRows);
  };

  const handleProductListToggle = () => {
    setIsProductListOpen(!isProductListOpen);
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
              value={selectedProductos.map((product) => product._id)}
              onChange={handleProductSelection}
              SelectProps={{
                multiple: true,
                renderValue: (selected) =>
                  selectedProductos
                    .filter((product) =>
                      selected.includes(product._id)
                    )
                    .map((product) => product.nombre)
                    .join(", "),
              }}
              onFocus={handleProductListToggle} // Abre la lista de selección de productos
              InputProps={{
                onBlur: handleProductListToggle, // Cierra la lista de selección de productos al perder el enfoque
              }}
              open={isProductListOpen} // Estado de apertura de la lista de selección de productos
            >
              {productos.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.nombre}
                </MenuItem>
              ))}
            </TextField>
            <Box maxHeight={200} overflow="auto" marginTop={2}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProductRows.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.nombre}</TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <InputLabel htmlFor={`cantidad-${product._id}`}>
                            Cantidad
                          </InputLabel>
                          <Input
                            id={`cantidad-${product._id}`}
                            value={product.cantidad}
                            type="number"
                            inputProps={{ min: 1 }}
                            onChange={(e) =>
                              handleQuantityChange(e, product)
                            }
                          />
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            handleRemoveSelectedProduct(product)
                          }
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Button type="submit" variant="contained" color="primary">
              {selectedService ? "Actualizar" : "Añadir"}
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ServiceForm;
