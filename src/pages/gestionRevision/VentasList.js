import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const VentasList = ({ ventas }) => {
  return (
    <List sx={{ overflow: "auto", maxHeight: 500 }}>
      {ventas.map((venta) => (
        <ListItem key={venta._id}>
          <ListItemText
            primary={`Fecha: ${new Date(venta.fechaCreacion).toLocaleDateString()}`}
            secondary={
              <>
                <Typography variant="subtitle1">Productos:</Typography>
                <ul>
                  {venta.productos.map((producto) => (
                    <li key={producto._id}>
                      <Typography>{`Nombre: ${producto.nombre}`}</Typography>
                      <Typography>{`Precio: ${producto.precio}`}</Typography>
                      <Typography>{`Tipo: ${producto.tipo}`}</Typography>
                      <Typography>{`Fecha: ${new Date(producto.fecha).toLocaleDateString()}`}</Typography>
                      <Typography>{`Cantidad: ${producto.cantidad}`}</Typography>
                    </li>
                  ))}
                </ul>
                <Typography variant="subtitle1">Servicios:</Typography>
                <ul>
                  {venta.servicios.map((servicio) => (
                    <li key={servicio._id}>
                      <Typography>{`Nombre: ${servicio.name}`}</Typography>
                      <Typography>{`Precio: ${servicio.precio}`}</Typography>
                      <Typography>{`Tipo: ${servicio.tipo}`}</Typography>
                      <Typography>{`Descripción: ${servicio.descripcion}`}</Typography>
                    </li>
                  ))}
                </ul>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default VentasList;
