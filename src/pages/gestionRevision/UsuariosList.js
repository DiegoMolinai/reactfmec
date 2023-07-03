import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const UsuariosList = ({ usuarios, onUsuarioClick }) => {
  return (
    <List component="nav">
      {usuarios.map((usuario) => (
        <ListItem
          button
          key={usuario.id}
          onClick={() => onUsuarioClick(usuario.id)}
          sx={{ backgroundColor: usuario.selected ? "#e0e0e0" : "inherit" }}
        >
          <ListItemText primary={usuario.nombre} secondary={usuario.correo} />
        </ListItem>
      ))}
    </List>
  );
};

export default UsuariosList;
