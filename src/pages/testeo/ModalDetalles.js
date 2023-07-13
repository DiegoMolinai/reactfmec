import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';

const ModalDetalles = ({ open, onClose, venta }) => {
  return (
    <Modal open={open} onClose={onClose}>
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
        {venta ? (
          <div>
            <Typography variant="h4">Detalles de la venta</Typography>
            <Typography variant="h5">ID Ventas: {venta.idVentas}</Typography>
            <Typography variant="h5">Fecha de Creación: {new Date(venta.fechaCreacion).toLocaleDateString('es-ES')}</Typography>
            <Typography variant="h5">Esta Terminada: {venta.estaTerminada ? 'Si' : 'No'}</Typography>
            <Typography variant="h5">Esta Pagada: {venta.estaPagada ? 'Si' : 'No'}</Typography>
          </div>
        ) : null}
        <Button onClick={onClose}>Cerrar</Button>
      </Box>
    </Modal>
  );
};

export default ModalDetalles;
