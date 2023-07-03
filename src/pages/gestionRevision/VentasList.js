import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const VentasList = ({ ventas, onVentaBorrar }) => {
  const handleBorrarClick = (ventaId) => {
    onVentaBorrar(ventaId);
  };

  return (
    <List>
      {ventas.map((venta) => (
        <ListItem key={venta.id}>
          <ListItemText primary={venta.tipo} secondary={`Precio: ${venta.precio}`} />
          <IconButton aria-label="Borrar" onClick={() => handleBorrarClick(venta.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default VentasList;
