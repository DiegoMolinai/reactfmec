import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  List,
  ListItem,
  Grid,
} from "@mui/material";
import TablaVentas from "./TablaVentas";
import ModalDetalles from "./ModalDetalles";
import ModalAgregarVenta from "./ModalAgregarVenta";

const ListaVentas = () => {
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [isAddingVenta, setIsAddingVenta] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchVentas = async () => {
    const response = await fetch("http://localhost:9000/api/ventas");
    const data = await response.json();
    setVentas(data);
  };

  useEffect(() => {
    fetchVentas(); // Fetch when component mounts
    const intervalId = setInterval(fetchVentas, 5000); // Fetch every 5 seconds
    return () => clearInterval(intervalId); // clear interval when component unmounts
  }, []); // Empty dependency array means this effect runs once when component mounts

  const handleAgregarVenta = async () => {
    const nuevaVenta = {
      /* Aquí va la nueva venta */
    };
    const response = await fetch("http://localhost:9000/api/ventas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaVenta),
    });
    const data = await response.json();
    // Añadir la nueva venta a la lista
    setVentas((ventas) => [...ventas, data]);
  };

  const handleAgregarVentaClick = () => {
    setIsAddingVenta(true);
  };

  const handleAgregarVentaModalClose = () => {
    setIsAddingVenta(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessorKey: "idVentas",
      },
      {
        Header: "Esta Terminada",
        accessorKey: "estaTerminada",
        // Podemos incluso personalizar cómo se renderiza esta celda, por ejemplo, mostrando "Sí" o "No" en lugar de true o false
        Cell: ({ value }) => (value ? "Sí" : "No"),
      },
      {
        Header: "Esta Pagada",
        accessorKey: "estaPagada",
        Cell: ({ value }) => (value ? "Sí" : "No"),
      },
      {
        Header: "Productos",
        id: "productos",
        Cell: ({ row }) => {
          return (
            <List>
              {row.original.productos.map((producto) => (
                <ListItem key={producto.idProducto}>{producto.nombre}</ListItem>
              ))}
            </List>
          );
        },
      },
      {
        Header: "Servicios",
        id: "servicios",
        Cell: ({ row }) => {
          return (
            <List>
              {row.original.servicios.map((servicio) => (
                <ListItem key={servicio.idServicio}>{servicio.name}</ListItem>
              ))}
            </List>
          );
        },
      },
    ],
    []
  );

  const handleNotificationClick = (venta) => {
    setSelectedVenta(venta);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVenta(null);
    setModalOpen(false);
  };

  return (
    <Container
      sx={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "4px",
        position: "relative",
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography variant="h2">Lista de Ventas</Typography>
        <Button
          onClick={handleAgregarVentaClick}
          sx={{
            fontSize: "20px",
            backgroundColor: "blue",
            color: "white",
            "&:hover": { backgroundColor: "darkblue" },
          }}
        >
          Agregar Venta
        </Button>
      </Grid>
      <TablaVentas
        columns={columns}
        data={ventas}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalAgregarVenta
        open={isAddingVenta}
        onClose={handleAgregarVentaModalClose}
      />
      <ModalDetalles
        open={modalOpen}
        onClose={handleCloseModal}
        notification={selectedVenta}
      />
    </Container>
  );
};

export default ListaVentas;
