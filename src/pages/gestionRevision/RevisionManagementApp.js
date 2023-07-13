import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
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
      const response = await fetch("http://localhost:9000/usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.log("Error al obtener los usuarios:", error.message);
    }
  };

  const fetchVentas = async () => {
    try {
      const response = await fetch("http://localhost:9000/ventas");
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.log("Error al obtener las ventas:", error.message);
    }
  };

  const handleUsuarioClick = (usuarioId) => {
    setSelectedUsuario(usuarioId);
  };

  const handleVentaBorrar = async (ventaId) => {
    try {
      await fetch(`http://localhost:9000/ventas/${ventaId}`, {
        method: "DELETE",
      });
      fetchVentas();
    } catch (error) {
      console.log("Error al borrar la venta:", error.message);
    }
  };

  // Filtrar las ventas del usuario seleccionado
  const filteredVentas = ventas.filter((venta) =>
    usuarios.some((usuario) => usuario.vendedor === venta.vendedor && usuario._id === selectedUsuario)
  );

  // Obtener el usuario seleccionado
  const selectedUsuarioObj = usuarios.find((usuario) => usuario._id === selectedUsuario);

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "4px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Gestión de Usuarios
          </Typography>
          <UsuariosList usuarios={usuarios} onUsuarioClick={handleUsuarioClick} selectedUsuario={selectedUsuario} />

        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Ventas del Usuario
          </Typography>
          {selectedUsuarioObj ? (
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
