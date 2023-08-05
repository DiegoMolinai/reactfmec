import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import UsuariosList from "./UsuariosList";
import VentasList from "./VentasList";

const RevisionManagementApp = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
    fetchVentas();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.log("Error al obtener los usuarios:", error.message);
    }
  };

  const fetchVentas = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/ventas");
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.log("Error al obtener las ventas:", error.message);
    }
  };

  const handleUsuarioClick = (usuarioId) => {
    setSelectedUsuario(usuarioId);
  };

  const filteredVentas = ventas.filter(
    (venta) =>
      usuarios.some(
        (usuario) =>
          usuario.vendedor === venta.vendedor &&
          usuario._id === selectedUsuario
      )
  );

  const selectedUsuarioObj = usuarios.find(
    (usuario) => usuario._id === selectedUsuario
  );

  return (
    <Container maxWidth="xl">
      <Box mt={3} mb={3} component={Paper} sx={{ padding: "20px", borderRadius: "4px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" gutterBottom>
              Gestión de Usuarios
            </Typography>
            <UsuariosList
              usuarios={usuarios}
              onUsuarioClick={handleUsuarioClick}
              selectedUsuario={selectedUsuario}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" gutterBottom>
              Ventas del Usuario
            </Typography>
            {selectedUsuarioObj ? (
              <VentasList ventas={filteredVentas} />
            ) : (
              <Box mt={2}>
                <Typography variant="body1" color="textSecondary">
                  Seleccione un usuario para ver sus ventas.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RevisionManagementApp;
