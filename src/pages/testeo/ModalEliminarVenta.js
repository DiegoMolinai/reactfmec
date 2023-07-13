import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const ModalEliminarVenta = ({ open, onClose, onDelete }) => {
  const handleEliminarVenta = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Eliminar Venta</DialogTitle>
      <DialogContent>
        <Typography variant="body1">¿Estás seguro de que quieres eliminar esta venta?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleEliminarVenta} color="primary" autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEliminarVenta;
