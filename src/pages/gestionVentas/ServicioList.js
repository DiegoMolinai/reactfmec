import { useState, useEffect } from "react";
import { Grid, List, ListItem, ListItemText, Typography, Button } from "@mui/material";

const ServicioList = ({ serviciosSeleccionados, onAgregarServicio, onEliminarServicio }) => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Simular la obtención de servicios desde la API
    fetch("http://localhost:9000/api/servicios")
      .then((response) => response.json())
      .then((data) => setServicios(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAgregarClick = (servicio) => {
    onAgregarServicio(servicio);
    console.log(servicio);
  };

  const handleEliminarClick = (servicio) => {
    onEliminarServicio(servicio);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Servicios Disponibles
        </Typography>
        <List sx={{ maxHeight: 200, overflow: "auto" }}>
          {servicios.map((servicio) => (
            <ListItem key={servicio._id}>
              <ListItemText primary={servicio.nombre} secondary={`Precio: $${servicio.precio}`} />
              {serviciosSeleccionados.includes(servicio) ? (
                <Button variant="contained" color="secondary" onClick={() => handleEliminarClick(servicio)}>
                  Eliminar
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={() => handleAgregarClick(servicio)}>
                  Agregar
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ServicioList;
