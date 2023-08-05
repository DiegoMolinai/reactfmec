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
} from "@mui/material";

const VentasList = ({ ventas }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "lightgreen" }}>
              <TableCell
                align="center"
                style={{ width: "25%", border: "3px solid black", fontWeight: "bold" }}
              >
                Fecha
              </TableCell>
              <TableCell
                align="center"
                style={{ width: "35%", border: "3px solid black", fontWeight: "bold" }}
              >
                Productos
              </TableCell>
              <TableCell
                align="center"
                style={{ width: "20%", border: "3px solid black", fontWeight: "bold" }}
              >
                Servicios
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventas && ventas.length > 0 ? (
              ventas.map((venta) => (
                <TableRow key={venta._id}>
                  <TableCell
                    align="center"
                    style={{ width: "25%", border: "3px solid black", fontWeight: "bold" }}
                  >
                    {new Date(venta.fechaCreacion).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: "35%", border: "3px solid black", fontWeight: "bold" }}
                  >
                    {venta.productos.length > 0 ? (
                      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                        {venta.productos.map((producto) => (
                          <li key={producto._id}>
                            <Box mb={2}>
                              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                                Nombre: {producto.nombre}
                              </Typography>
                              <Typography variant="body2">Precio: {producto.precio}</Typography>
                              <Typography variant="body2">Tipo: {producto.tipo}</Typography>
                              <Typography variant="body2">
                                Fecha: {new Date(producto.fecha).toLocaleDateString()}
                              </Typography>
                              <Typography variant="body2">
                                Cantidad: {producto.cantidad}
                              </Typography>
                            </Box>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No hay productos.
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: "20%", border: "3px solid black", fontWeight: "bold" }}
                  >
                    {venta.servicios.length > 0 ? (
                      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                        {venta.servicios.map((servicio) => (
                          <li key={servicio._id}>
                            <Box mb={2}>
                              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                                Nombre: {servicio.name}
                              </Typography>
                              <Typography variant="body2">Precio: {servicio.precio}</Typography>
                              <Typography variant="body2">Tipo: {servicio.tipo}</Typography>
                              <Typography variant="body2">
                                Descripción: {servicio.descripcion}
                              </Typography>
                            </Box>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No hay servicios.
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={3}
                  style={{ border: "3px solid black", fontWeight: "bold" }}
                >
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

export default VentasList;
