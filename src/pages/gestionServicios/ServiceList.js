import { useState, useEffect } from "react";
import { Grid, List, ListItem, ListItemText, Modal, Backdrop, Fade, Typography } from "@mui/material";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceProducts, setSelectedServiceProducts] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/servicios");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/productos");
      const data = await response.json();

      // Filtrar los productos utilizados por el servicio seleccionado
      const productsUtilizados = data.filter((product) =>
        selectedService.productos.includes(product._id)
      );
      setSelectedServiceProducts(productsUtilizados);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setSelectedServiceProducts([]);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedService) {
      fetchProducts();
    }
  }, [selectedService]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List component="nav">
          {services.map((service) => (
            <ListItem
              key={service._id}
              button
              onClick={() => handleServiceClick(service)}
            >
              <ListItemText primary={service.name} />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Modal
        open={Boolean(selectedService)}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Boolean(selectedService)}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "auto",
              backgroundColor: "#fff",
              boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
              padding: "20px",
            }}
          >
            {selectedService && (
              <div>
                <Typography variant="h6" gutterBottom>
                  {selectedService.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {selectedService.tipo}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedService.descripcion}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Productos utilizados:
                </Typography>
                <List>
                  {selectedServiceProducts.map((product) => (
                    <ListItem key={product._id}>
                      <ListItemText primary={product.nombre} />
                    </ListItem>
                  ))}
                </List>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default ServiceList;
