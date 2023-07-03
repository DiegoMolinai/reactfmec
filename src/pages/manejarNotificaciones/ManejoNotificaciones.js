import React, { useState } from "react";
import { Typography, Box, Container, Modal, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const MantencionVehiculos = () => {
  const [tareas, setTareas] = useState([]);

  const [selectedTarea, setSelectedTarea] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleAgregarTarea = () => {
    // Lógica para agregar una nueva tarea
    const nuevaTarea = {
      id: Date.now(),
      nombre: generarNombreAleatorio(),
    };
    setTareas((prevTareas) => [...prevTareas, nuevaTarea]);
  };

  const handleEditarTarea = (tareaId) => {
    // Lógica para editar una tarea
    const tarea = tareas.find((tarea) => tarea.id === tareaId);
    setSelectedTarea(tarea);
    setOpenModal(true);
  };

  const handleVerTarea = (tareaId) => {
    // Lógica para ver una tarea
    const tarea = tareas.find((tarea) => tarea.id === tareaId);
    setSelectedTarea(tarea);
    setOpenModal(true);
  };

  const handleEliminarTarea = (tareaId) => {
    // Lógica para eliminar una tarea
    setTareas((prevTareas) => prevTareas.filter((tarea) => tarea.id !== tareaId));
  };

  const generarNombreAleatorio = () => {
    // Array de nombres de ejemplo
    const nombres = [
      "Cambio de aceite",
      "Revisión de frenos",
      "Cambio de neumáticos",
      "Alineación y balanceo",
      "Cambio de filtro de aire",
    ];

    // Generar un nombre aleatorio
    const indiceAleatorio = Math.floor(Math.random() * nombres.length);
    return nombres[indiceAleatorio];
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "4px" }}>
      <Typography variant="h5" gutterBottom>
        Mantención de Vehículos
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <div key={tarea.id} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ flex: 1 }}>
                {tarea.nombre}
              </Typography>
              <IconButton onClick={() => handleEditarTarea(tarea.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleVerTarea(tarea.id)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => handleEliminarTarea(tarea.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No hay tareas disponibles.
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button onClick={handleAgregarTarea}>Agregar Tarea</button>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "4px" }}>
          <Typography variant="h6" gutterBottom>
            Detalles de la Tarea
          </Typography>
          {selectedTarea && (
            <Typography variant="body1" gutterBottom>
              Nombre: {selectedTarea.nombre}
            </Typography>
          )}
          {/* Aquí puedes agregar más detalles de la tarea */}
        </div>
      </Modal>
    </Container>
  );
};

export default MantencionVehiculos;
