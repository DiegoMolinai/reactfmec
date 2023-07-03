import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';

const ModalDetalles = ({ open, onClose, notification }) => {
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
        {notification ? (
          <div>
            <Typography variant="h4">
              Detalles de la notificación
            </Typography>
            <Typography variant="h5">Título: {notification.titulo}</Typography>
            <Typography variant="h5">Descripción: {notification.descripcion}</Typography>
            <Typography variant="h5">Fecha: {notification.fecha}</Typography>
          </div>
        ) : null}
        <Button onClick={onClose}>Cerrar</Button>
      </Box>
    </Modal>
  );
};

export default ModalDetalles;