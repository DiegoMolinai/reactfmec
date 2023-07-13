import { useState, useEffect } from "react";
import { Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Modal, Backdrop, Fade, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ServiceList = ({ services, onDeleteService, onEditService }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedService(null);
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List component="nav">
          {services.map((service) => (
            <ListItem key={service._id} button onClick={() => handleOpen(service)}>
              <ListItemText primary={service.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => onEditService(service)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteService(service._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div style={{ backgroundColor: '#fff', padding: '1em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '300px' }}>
            <Typography variant="h6">Detalle del Servicio</Typography>
            {selectedService && (
              <>
                <Typography variant="body1"><strong>Nombre:</strong> {selectedService.name}</Typography>
                <Typography variant="body1"><strong>ID de Cambio:</strong> {selectedService.idCambio}</Typography>
                <Typography variant="body1"><strong>Tipo:</strong> {selectedService.tipo}</Typography>
                <Typography variant="body1"><strong>Descripción:</strong> {selectedService.descripcion}</Typography>
                <Typography variant="body1"><strong>Productos:</strong> {selectedService.productos.join(', ')}</Typography>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default ServiceList;
