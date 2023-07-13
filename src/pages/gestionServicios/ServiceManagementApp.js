import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';

const ServiceManagementApp = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:9000/api/servicios')
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddService = (service) => {
    setServices([...services, service]);
    setIsFormOpen(false);
  };

  const handleUpdateService = (updatedService) => {
    const updatedServices = services.map((service) => {
      if (service.id === updatedService.id) {
        return updatedService;
      }
      return service;
    });
    setServices(updatedServices);
    setIsFormOpen(false);
  };

  const handleDeleteService = (id) => {
    const filteredServices = services.filter((service) => service.id !== id);
    setServices(filteredServices);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const handleOpenForm = () => {
    setSelectedService(null);
    setIsFormOpen(true);
  };

  return (
    <Container maxWidth="md"style={{
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "4px",
    }}>
      <Typography variant="h4" align="center" gutterBottom>
        Servicios
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenForm}>
        Agregar Servicio
      </Button>
      <ServiceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAddService={handleAddService}
        onUpdateService={handleUpdateService}
        selectedService={selectedService}
      />
      <ServiceList
        services={services}
        onDeleteService={handleDeleteService}
        onEditService={handleEditService}
      />
    </Container>
  );
};

export default ServiceManagementApp;
