import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
} from "@mui/material";

const SaleRequestForm = () => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleBrand: "",
    products: [],
    services: [],
  });

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [productList, setProductList] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleProductAdd = () => {
    if (
      selectedProduct !== "" &&
      !customerInfo.products.includes(selectedProduct)
    ) {
      setCustomerInfo((prevInfo) => ({
        ...prevInfo,
        products: [...prevInfo.products, selectedProduct],
      }));
    }
  };

  const handleServiceAdd = () => {
    if (
      selectedService !== "" &&
      !customerInfo.services.includes(selectedService)
    ) {
      setCustomerInfo((prevInfo) => ({
        ...prevInfo,
        services: [...prevInfo.services, selectedService],
      }));
    }
  };

  const handleScanBarcode = () => {
    // Lógica para escanear código de barras
    console.log("Código de barras escaneado");
  };

  return (
    <Container
      maxWidth="md"
      sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "4px" }}
    >
      <Typography variant="h5" gutterBottom>
        Solicitud de Venta
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              name="firstName"
              value={customerInfo.firstName}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              name="lastName"
              value={customerInfo.lastName}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tipo de Vehículo"
              name="vehicleType"
              value={customerInfo.vehicleType}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Modelo de Vehículo"
              name="vehicleModel"
              value={customerInfo.vehicleModel}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Marca de Vehículo"
              name="vehicleBrand"
              value={customerInfo.vehicleBrand}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="product-select-label">Productos</InputLabel>
              <Select
                labelId="product-select-label"
                id="product-select"
                value={selectedProduct}
                onChange={(event) => setSelectedProduct(event.target.value)}
              >
                {productList.map((product) => (
                  <MenuItem key={product} value={product}>
                    {product}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="outlined"
                onClick={handleProductAdd}
                style={{ marginTop: "10px" }}
              >
                Agregar Producto
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="service-select-label">Servicios</InputLabel>
              <Select
                labelId="service-select-label"
                id="service-select"
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
              >
                {serviceList.map((service) => (
                  <MenuItem key={service} value={service}>
                    {service}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="outlined"
                onClick={handleServiceAdd}
                style={{ marginTop: "10px" }}
              >
                Agregar Servicio
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={handleScanBarcode}
              fullWidth
              size="large"
              style={{ marginTop: "10px", height: "10vh" }}
            >
              Escanear Código de Barras
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Enviar Solicitud
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SaleRequestForm;
