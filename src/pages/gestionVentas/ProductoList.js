import { useState, useEffect } from "react";
import { Grid, List, ListItem, ListItemText, Typography, Button } from "@mui/material";

const ProductoList = ({ productosSeleccionados, onAgregarProducto, onEliminarProducto }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Simular la obtención de productos desde la API
    fetch("http://localhost:9000/api/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAgregarClick = (producto) => {
    onAgregarProducto(producto);
  };

  const handleEliminarClick = (producto) => {
    onEliminarProducto(producto);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Productos Disponibles
        </Typography>
        <List sx={{ maxHeight: 200, overflow: "auto" }}>
          {productos.map((producto) => (
            <ListItem key={producto._id}>
              <ListItemText primary={producto.nombre} secondary={`Precio: $${producto.precio}`} />
              {productosSeleccionados.includes(producto) ? (
                <Button variant="contained" color="secondary" onClick={() => handleEliminarClick(producto)}>
                  Eliminar
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={() => handleAgregarClick(producto)}>
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

export default ProductoList;
