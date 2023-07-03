import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Modal, Container } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';

// Mock Data
const makeData = () => {
  const data = [];

  for (let i = 0; i < 10; i++) {
    const row = {
      id: i + 1,
      usuario: `Usuario ${i + 1}`,
      venta: `Venta ${i + 1}`,
      productos: [
        { nombre: `Producto ${i + 1}-1` },
        { nombre: `Producto ${i + 1}-2` },
        { nombre: `Producto ${i + 1}-3` },
      ],
    };

    data.push(row);
  }

  return data;
};

const ListaVentas = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const data = useMemo(() => makeData(), []);

  const visibleData = useMemo(() => (showAllUsers ? data : data.slice(0, 5)), [
    data,
    showAllUsers,
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'usuario',
        header: 'Usuario',
      },
      {
        accessorKey: 'venta',
        header: 'Venta',
      },
      {
        accessorKey: 'productos',
        header: 'Productos Vendidos',
        Cell: ({ cell }) => (
          <Button onClick={() => handleUserClick(cell.getValue())}>
            Ver detalles
          </Button>
        ),
      },
    ],
    []
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const handleToggleShowAllUsers = () => {
    setShowAllUsers((prevState) => !prevState);
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "4px" }}>
      <Typography variant="h2">Lista de Ventas</Typography>
      <MaterialReactTable
        columns={columns}
        data={visibleData}
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enablePinning
        enableRowActions
        enableRowSelection
        initialState={{ showColumnFilters: true }}
      />
      {!showAllUsers && (
        <Button onClick={handleToggleShowAllUsers} variant="contained">
          Mostrar todos los usuarios
        </Button>
      )}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '2rem',
            boxShadow: 24,
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'auto',
          }}
        >
          {selectedUser && (
            <div>
              <Typography variant="h4">
                Ventas de {selectedUser.usuario}
              </Typography>
              {selectedUser.productos && selectedUser.productos.length > 0 ? (
                selectedUser.productos.map((producto, index) => (
                  <div key={index}>
                    <Typography variant="h5">{producto.nombre}</Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body1">
                  No hay productos registrados para esta venta.
                </Typography>
              )}
            </div>
          )}
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ListaVentas;
