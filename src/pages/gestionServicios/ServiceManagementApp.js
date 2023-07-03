import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';

const ServiceManagementApp = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Simular la obtención de servicios desde la API
    fetch('http://localhost:9000/api/servicios')
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddService = (service) => {
    // Aquí debes realizar la lógica para guardar el servicio en la base de datos
    // y luego actualizar el estado con los servicios actualizados
    setServices([...services, service]);
  };

  const handleUpdateService = (updatedService) => {
    // Aquí debes realizar la lógica para actualizar el servicio en la base de datos
    // y luego actualizar el estado con los servicios actualizados
    const updatedServices = services.map((service) => {
      if (service.id === updatedService.id) {
        return updatedService;
      }
      return service;
    });
    setServices(updatedServices);
    setSelectedService(null);
  };

  const handleDeleteService = (id) => {
    // Aquí debes realizar la lógica para eliminar el servicio de la base de datos
    // y luego actualizar el estado con los servicios actualizados
    const filteredServices = services.filter((service) => service.id !== id);
    setServices(filteredServices);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
  };

  const handleSelectService = (service) => {
    // Lógica para manejar la selección del servicio
    console.log("Servicio seleccionado:", service);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Servicios
      </Typography>
      <Grid container spacing={2} sx={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
        <Grid item xs={12}>
          <ServiceForm
            onAddService={handleAddService}
            onUpdateService={handleUpdateService}
            selectedService={selectedService}
          />
        </Grid>
        <Grid item xs={12}>
          <ServiceList
            services={services}
            onDeleteService={handleDeleteService}
            onEditService={handleEditService}
            onSelectService={handleSelectService}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiceManagementApp;
