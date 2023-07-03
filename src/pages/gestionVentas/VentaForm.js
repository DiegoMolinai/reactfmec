import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const VentaForm = () => {
  const [ventaData, setVentaData] = useState({
    idCambio: "",
    precio: "",
    tipo: "",
    servicios: [],
    productos: [],
    vehiculo: "",
  });

  const handleInputChange = (e) => {
    setVentaData({ ...ventaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para guardar la venta en la base de datos
    console.log(ventaData);
    // Limpia el formulario
    setVentaData({
      idCambio: "",
      precio: "",
      tipo: "",
      servicios: [],
      productos: [],
      vehiculo: "",
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Agregar Venta</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="idCambio"
          label="ID Cambio"
          fullWidth
          value={ventaData.idCambio}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="precio"
          label="Precio"
          fullWidth
          value={ventaData.precio}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Tipo</InputLabel>
          <Select
            name="tipo"
            value={ventaData.tipo}
            onChange={handleInputChange}
          >
            <MenuItem value="Tipo 1">Tipo 1</MenuItem>
            <MenuItem value="Tipo 2">Tipo 2</MenuItem>
            <MenuItem value="Tipo 3">Tipo 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="vehiculo"
          label="Vehículo"
          fullWidth
          value={ventaData.vehiculo}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Guardar Venta
        </Button>
      </Grid>
    </Grid>
  );
};

export default VentaForm;
