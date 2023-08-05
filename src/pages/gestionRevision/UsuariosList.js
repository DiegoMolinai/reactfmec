import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const UsuariosList = ({ usuarios, onUsuarioClick, selectedUsuario }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "lightblue" }}>
              <TableCell align="center" style={{ width: "25%", border: "3px solid black", fontWeight: "bold" }}>
                Nombre
              </TableCell>
              <TableCell align="center" style={{ width: "35%", border: "3px solid black", fontWeight: "bold" }}>
                Correo
              </TableCell>
              <TableCell align="center" style={{ width: "20%", border: "3px solid black", fontWeight: "bold" }}>
                Rol
              </TableCell>
              <TableCell align="center" style={{ width: "20%", border: "3px solid black", fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <TableRow key={usuario._id}>
                  <TableCell align="center" style={{ width: "25%", border: "3px solid black", fontWeight: "bold" }}>
                    {usuario.nombre}
                  </TableCell>
                  <TableCell align="center" style={{ width: "35%", border: "3px solid black", fontWeight: "bold" }}>
                    {usuario.email}
                  </TableCell>
                  <TableCell align="center" style={{ width: "20%", border: "3px solid black", fontWeight: "bold" }}>
                    {usuario.rol}
                  </TableCell>
                  <TableCell align="center" style={{ width: "20%", border: "3px solid black", fontWeight: "bold" }}>
                    <Button
                      variant="contained"
                      onClick={() => onUsuarioClick(usuario._id)}
                      style={{ textTransform: "none" }}
                      disabled={selectedUsuario === usuario._id}
                    >
                      Ver Ventas
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  No hay usuarios disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const VentasList = ({ ventas }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "lightgreen" }}>
              <TableCell align="center" style={{ width: "25%", border: "3px solid black", fontWeight: "bold" }}>
                Fecha
              </TableCell>
              <TableCell align="center" style={{ width: "35%", border: "3px solid black", fontWeight: "bold" }}>
                Productos
              </TableCell>
              <TableCell align="center" style={{ width: "40%", border: "3px solid black", fontWeight: "bold" }}>
                Servicios
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventas.length > 0 ? (
              ventas.map((venta) => (
                <TableRow key={venta._id}>
                  <TableCell align="center" style={{ width: "25%", border: "3px solid black", fontWeight: "bold" }}>
                    {new Date(venta.fechaCreacion).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center" style={{ width: "35%", border: "3px solid black", fontWeight: "bold" }}>
                    <List>
                      {venta.productos.map((producto) => (
                        <ListItem key={producto._id}>
                          <ListItemText primary={`Nombre: ${producto.nombre}`} />
                          <ListItemText primary={`Precio: ${producto.precio}`} />
                          <ListItemText primary={`Tipo: ${producto.tipo}`} />
                          <ListItemText primary={`Fecha: ${new Date(producto.fecha).toLocaleDateString()}`} />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell align="center" style={{ width: "40%", border: "3px solid black", fontWeight: "bold" }}>
                    <List>
                      {venta.servicios.map((servicio) => (
                        <ListItem key={servicio._id}>
                          <ListItemText primary={`Nombre: ${servicio.nombre}`} />
                          <ListItemText primary={`Precio: ${servicio.precio}`} />
                          <ListItemText primary={`Descripción: ${servicio.descripcion}`} />
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  No hay ventas disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsuariosList;
