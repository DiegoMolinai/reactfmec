import React from 'react';
import { Box, Container, Typography, Button, Modal } from '@mui/material';

// Componente del modal
const CustomModal = ({ open, onClose, title, content }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        <Button onClick={onClose}>Cerrar</Button>
      </Box>
    </Modal>
  );
};

// Componente principal
const ReviewComponent = () => {
  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [salesModalOpen, setSalesModalOpen] = React.useState(false);
  const [servicesModalOpen, setServicesModalOpen] = React.useState(false);
  const [notificationsModalOpen, setNotificationsModalOpen] = React.useState(false);

  const handleUserModalOpen = () => {
    setUserModalOpen(true);
  };

  const handleUserModalClose = () => {
    setUserModalOpen(false);
  };

  const handleSalesModalOpen = () => {
    setSalesModalOpen(true);
  };

  const handleSalesModalClose = () => {
    setSalesModalOpen(false);
  };

  const handleServicesModalOpen = () => {
    setServicesModalOpen(true);
  };

  const handleServicesModalClose = () => {
    setServicesModalOpen(false);
  };

  const handleNotificationsModalOpen = () => {
    setNotificationsModalOpen(true);
  };

  const handleNotificationsModalClose = () => {
    setNotificationsModalOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Revisión de Inventario, Ventas y Servicios
        </Typography>
        <Button variant="contained" onClick={handleUserModalOpen} sx={{ mt: 2 }}>
          Ver Inventario
        </Button>
        <Button variant="contained" onClick={handleSalesModalOpen} sx={{ mt: 2 }}>
          Ver Ventas
        </Button>
        <Button variant="contained" onClick={handleServicesModalOpen} sx={{ mt: 2 }}>
          Ver Servicios
        </Button>
        <Button variant="contained" onClick={handleNotificationsModalOpen} sx={{ mt: 2 }}>
          Ver Notificaciones
        </Button>
      </Box>

      <CustomModal
        open={userModalOpen}
        onClose={handleUserModalClose}
        title="Inventario"
        content="Aqui se mostrara el inventario"
      />

      <CustomModal
        open={salesModalOpen}
        onClose={handleSalesModalClose}
        title="Ventas"
        content="Aquí se mostrarían las ventas realizadas."
      />

      <CustomModal
        open={servicesModalOpen}
        onClose={handleServicesModalClose}
        title="Servicios"
        content="Aquí se mostrarían los servicios disponibles."
      />

      <CustomModal
        open={notificationsModalOpen}
        onClose={handleNotificationsModalClose}
        title="Notificaciones"
        content="Aquí se mostrarían las notificaciones pendientes."
      />
    </Container>
  );
};

export default ReviewComponent;
