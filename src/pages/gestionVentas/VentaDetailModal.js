import { Box, Typography, List, ListItem, ListItemText, Modal, Button } from "@mui/material";
import { useState } from "react";

const VentaDetailModal = ({ ventaDetail }) => {
  const [isOpen, setIsOpen] = useState(ventaDetail !== null);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#ffffff",
          boxShadow: 24,
          p: 4,
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Detalle de la Venta
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Servicios:</Typography>
          {ventaDetail && ventaDetail.servicios.length > 0 ? (
            <List sx={{ maxHeight: "200px", overflowY: "auto" }}>
              {ventaDetail.servicios.map((servicio) => (
                <ListItem key={servicio._id}>
                  <ListItemText primary={servicio.nombre} secondary={`Precio: $${servicio.precio}`} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No se han seleccionado servicios.
            </Typography>
          )}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Productos:</Typography>
          {ventaDetail && ventaDetail.productos.length > 0 ? (
            <List sx={{ maxHeight: "200px", overflowY: "auto" }}>
              {ventaDetail.productos.map((producto) => (
                <ListItem key={producto._id}>
                  <ListItemText primary={producto.nombre} secondary={`Precio: $${producto.precio}`} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No se han seleccionado productos.
            </Typography>
          )}
        </Box>
        <Button onClick={handleClose}>Salir</Button>
      </Box>
    </Modal>
  );
};

export default VentaDetailModal;
