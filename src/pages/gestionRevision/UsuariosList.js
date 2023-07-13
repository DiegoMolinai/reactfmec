import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const UsuariosList = ({ usuarios, onUsuarioClick }) => {
  return (
    <List component="nav">
      {usuarios.map((usuario) => (
        <ListItem
          button
          key={usuario._id}
          onClick={() => onUsuarioClick(usuario._id)}
        >
          <ListItemText
            primary={usuario.nombre}
            secondary={
              <>
                <Typography variant="subtitle1">Correo: {usuario.email}</Typography>
                <Typography variant="subtitle1">Rol: {usuario.rol}</Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UsuariosList;
