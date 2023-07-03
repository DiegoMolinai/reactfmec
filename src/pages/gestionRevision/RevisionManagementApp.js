import React, { useState } from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import UsuariosList from "./UsuariosList";
import VentasList from "./VentasList";

const RevisionManagementApp = () => {
  const [usuarios] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juan@example.com" },
    { id: 2, nombre: "María Gómez", correo: "maria@example.com" },
    { id: 3, nombre: "Pedro Rodríguez", correo: "pedro@example.com" },
  ]);

  const generateVentas = (userId) => {
    const ventas = [];
    for (let i = 1; i <= 10; i++) {
      ventas.push({ id: i, tipo: "Presencial", precio: i * 100, usuarioId: userId });
    }
    return ventas;
  };

  const [ventas, setVentas] = useState(() => {
    const allVentas = usuarios.reduce((acc, user) => {
      const userVentas = generateVentas(user.id);
      return [...acc, ...userVentas];
    }, []);
    return allVentas;
  });

  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const handleUsuarioClick = (usuarioId) => {
    setSelectedUsuario(usuarioId);
  };

  const handleVentaBorrar = (ventaId) => {
    setVentas((prevVentas) => prevVentas.filter((venta) => venta.id !== ventaId));
  };

  const filteredVentas = ventas.filter((venta) => venta.usuarioId === selectedUsuario);

  return (
    <Container maxWidth="md" sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "4px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Gestión de Usuarios
          </Typography>
          <UsuariosList usuarios={usuarios} onUsuarioClick={handleUsuarioClick} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Ventas del Usuario
          </Typography>
          {selectedUsuario ? (
            <VentasList ventas={filteredVentas} onVentaBorrar={handleVentaBorrar} />
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" color="textSecondary">
                Seleccione un usuario para ver sus ventas.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RevisionManagementApp;
