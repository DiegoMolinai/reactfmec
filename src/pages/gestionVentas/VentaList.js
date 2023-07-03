import { useState, useEffect } from "react";
import { Grid, List, ListItem, ListItemText, Modal, Backdrop, Fade, Typography } from "@mui/material";

const VentaList = () => {
  const [ventas, setVentas] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState(null);

  const fetchVentas = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/ventas");
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.error("Error fetching ventas:", error);
    }
  };

  const handleVentaClick = (venta) => {
    setSelectedVenta(venta);
  };

  const handleCloseModal = () => {
    setSelectedVenta(null);
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Lista de Ventas</Typography>
      </Grid>
      <Grid item xs={12}>
        <List component="nav">
          {ventas.map((venta) => (
            <ListItem button key={venta._id} onClick={() => handleVentaClick(venta)}>
              <ListItemText primary={`ID: ${venta.idCambio}`} secondary={`Precio: ${venta.precio}`} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Modal
        open={selectedVenta !== null}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={selectedVenta !== null}>
          <div>
            <Typography variant="h6">Detalles de la Venta</Typography>
            {selectedVenta && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>ID Cambio: {selectedVenta.idCambio}</Typography>
                  <Typography>Precio: {selectedVenta.precio}</Typography>
                  <Typography>Tipo: {selectedVenta.tipo}</Typography>
                  <Typography>Vehículo: {selectedVenta.vehiculo}</Typography>
                </Grid>
              </Grid>
            )}
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default VentaList;
