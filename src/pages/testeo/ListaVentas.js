import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import ModalDetalles from './ModalDetalles';
import ModalAgregarVenta from './ModalAgregarVenta';
import ModalEditarVenta from './ModalEditarVenta';
import ModalEliminarVenta from './ModalEliminarVenta';
import TablaVentas from './TablaVentas'; // Importa el componente TablaVentas
import { useTable, usePagination } from 'react-table';


const ListaVentas = () => {
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [isAddingVenta, setIsAddingVenta] = useState(false);
  const [isEditingVenta, setIsEditingVenta] = useState(false);
  const [isDeletingVenta, setIsDeletingVenta] = useState(false);
  const pageSizeOptions = [5, 10, 20];

  const fetchVentas = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/ventas');
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  const handleAgregarVentaClick = () => {
    setIsAddingVenta(true);
  };

  const handleAgregarVentaModalClose = () => {
    setIsAddingVenta(false);
  };

  const handleVerDetallesClick = (venta) => {
    setSelectedVenta(venta);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVenta(null);
    setModalOpen(false);
    setIsEditingVenta(false);
    setIsDeletingVenta(false);
  };

  const handleEditarVentaClick = (venta) => {
    setSelectedVenta(venta);
    setIsEditingVenta(true);
  };

  const handleEditarVentaModalClose = () => {
    setIsEditingVenta(false);
  };

  const handleEliminarVentaClick = (venta) => {
    setSelectedVenta(venta);
    setIsDeletingVenta(true);
  };

  const handleEliminarVentaModalClose = () => {
    setIsDeletingVenta(false);
  };

  const handleConfirmEliminarVenta = async () => {
    try {
      await fetch(`http://localhost:9000/api/ventas/${selectedVenta.idVentas}`, {
        method: 'DELETE',
      });

      // Eliminación exitosa, actualiza la lista de ventas
      fetchVentas();
      handleCloseModal();
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID Ventas',
        accessor: 'idVentas',
      },
      {
        Header: 'Fecha de Creación',
        accessor: 'fechaCreacion',
        Cell: ({ value }) => new Date(value).toLocaleDateString('es-ES'),
      },
      {
        Header: 'Esta Terminada',
        accessor: 'estaTerminada',
        Cell: ({ value }) => (value ? 'Si' : 'No'),
      },
      {
        Header: 'Esta Pagada',
        accessor: 'estaPagada',
        Cell: ({ value }) => (value ? 'Si' : 'No'),
      },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <div>
            <Button
              startIcon={<Visibility />}
              onClick={() => handleVerDetallesClick(row.original)}
            >
              Ver Detalles
            </Button>
            <Button
              startIcon={<Edit />}
              onClick={() => handleEditarVentaClick(row.original)}
            >
              Editar
            </Button>
            <Button
              startIcon={<Delete />}
              onClick={() => handleEliminarVentaClick(row.original)}
            >
              Eliminar
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: ventas,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );
  
  const currentPage = pageIndex; // Reemplaza currentPage con pageIndex
  const itemsPerPage = pageSize;
  
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            bgcolor="#ffffff"
            p={3}
            borderRadius={4}
            textAlign="center"
            mb={2}
          >
            <Typography variant="h2">Lista de Ventas</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            bgcolor="#ffffff"
            p={3}
            borderRadius={4}
            textAlign="center"
            mb={2}
          >
            <Button
              onClick={handleAgregarVentaClick}
              variant="contained"
              sx={{
                fontSize: '20px',
                backgroundColor: 'blue',
                color: 'white',
                '&:hover': { backgroundColor: 'darkblue' },
              }}
            >
              Agregar Venta
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            {/* Utiliza el componente TablaVentas */}
            <TablaVentas columns={columns} data={ventas} pageSizeOptions={pageSizeOptions} />
          </Paper>
        </Grid>
      </Grid>
      <ModalAgregarVenta
        open={isAddingVenta}
        onClose={handleAgregarVentaModalClose}
      />
      <ModalDetalles
        open={modalOpen}
        onClose={handleCloseModal}
        venta={selectedVenta}
      />
      {isEditingVenta && (
        <ModalEditarVenta
          open={isEditingVenta}
          onClose={handleEditarVentaModalClose}
          venta={selectedVenta}
          fetchVentas={fetchVentas}
        />
      )}
      {isDeletingVenta && (
        <ModalEliminarVenta
          open={isDeletingVenta}
          onClose={handleEliminarVentaModalClose}
          onDelete={handleConfirmEliminarVenta}
        />
      )}
    </Container>
  );
};

export default ListaVentas;
