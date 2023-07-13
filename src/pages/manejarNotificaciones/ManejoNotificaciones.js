import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Modal,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Alert,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import UndoIcon from "@mui/icons-material/Undo";

const ManejoNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [tareasTerminadas, setTareasTerminadas] = useState([]);
  const [selectedNotificacion, setSelectedNotificacion] = useState(null);
  const [openEditarModal, setOpenEditarModal] = useState(false);
  const [openVisualizarModal, setOpenVisualizarModal] = useState(false);
  const [editedTitulo, setEditedTitulo] = useState("");
  const [editedDescripcion, setEditedDescripcion] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showMesonAlert, setShowMesonAlert] = useState(false);
  const [currentPageNotificaciones, setCurrentPageNotificaciones] = useState(1);
  const [currentPageTareasTerminadas, setCurrentPageTareasTerminadas] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchNotificaciones = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/notificaciones");
      if (response.status === 200) {
        const data = await response.json();
        const notificacionesTerminadas = data.filter(
          (notificacion) => notificacion.terminada === true
        );
        setNotificaciones(data);
        setTareasTerminadas(notificacionesTerminadas);
      } else {
        console.log("Error en la respuesta:", response.statusText);
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    }
  };

  const handleEditarNotificacion = (notificacion) => {
    setSelectedNotificacion(notificacion);
    setEditedTitulo(notificacion.titulo);
    setEditedDescripcion(notificacion.descripcion);
    setOpenEditarModal(true);
  };

  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/notificaciones/${selectedNotificacion._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: editedTitulo,
            descripcion: editedDescripcion,
          }),
        }
      );
      const data = await response.json();
      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.map((notificacion) =>
          notificacion._id === data._id ? data : notificacion
        )
      );
      handleCloseEditarModal();
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    }
  };

  const handleEliminarNotificacion = async (notificacion) => {
    try {
      await fetch(
        `http://localhost:9000/api/notificaciones/${notificacion._id}`,
        {
          method: "DELETE",
        }
      );
      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.filter(
          (notificacionItem) => notificacionItem._id !== notificacion._id
        )
      );
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    }
  };

  const handleEnviarAlertaMeson = () => {
    setShowMesonAlert(true);
    alert("Se ha generado una alerta al mesón.");
  };

  const handleCloseEditarModal = () => {
    setOpenEditarModal(false);
    setSelectedNotificacion(null);
    setEditedTitulo("");
    setEditedDescripcion("");
  };

  const handleMarcarComoTerminada = async (notificacion) => {
    try {
      await fetch(
        `http://localhost:9000/api/notificaciones/${notificacion._id}/marcar-como-terminada`,
        {
          method: "PATCH",
        }
      );
      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.map((notificacionItem) =>
          notificacionItem._id === notificacion._id
            ? { ...notificacionItem, terminada: true }
            : notificacionItem
        )
      );
      setTareasTerminadas((prevTareasTerminadas) => [
        ...prevTareasTerminadas,
        notificacion,
      ]);
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    }
  };

  const handleMarcarComoNoTerminada = async(notificacion) => {
  try {
    await fetch(
      `http://localhost:9000/api/notificaciones/${notificacion._id}/marcar-como-no-terminada`,
      {
        method: "PATCH",
      }
    );
    setNotificaciones((prevNotificaciones) =>
      prevNotificaciones.map((notificacionItem) =>
        notificacionItem._id === notificacion._id
          ? { ...notificacionItem, terminada: false }
          : notificacionItem
      )
    );
    setTareasTerminadas((prevTareasTerminadas) =>
      prevTareasTerminadas.filter((tarea) => tarea._id !== notificacion._id)
    );
  } catch (error) {
    console.log(error);
    setShowAlert(true);
  }
};

const handleVerNotificacion = (notificacion) => {
  setSelectedNotificacion(notificacion);
  setOpenVisualizarModal(true);
};

const handleCloseVisualizarModal = () => {
  setOpenVisualizarModal(false);
};

const handlePageChangeNotificaciones = (event, value) => {
  setCurrentPageNotificaciones(value);
};

const handlePageChangeTareasTerminadas = (event, value) => {
  setCurrentPageTareasTerminadas(value);
};

useEffect(() => {
  fetchNotificaciones();
}, []);

const indexOfLastItemNotificaciones = currentPageNotificaciones * itemsPerPage;
const indexOfFirstItemNotificaciones = indexOfLastItemNotificaciones - itemsPerPage;
const currentNotificaciones = notificaciones
  .filter((notificacion) => !notificacion.terminada)
  .slice(indexOfFirstItemNotificaciones, indexOfLastItemNotificaciones);

const indexOfLastItemTareasTerminadas = currentPageTareasTerminadas * itemsPerPage;
const indexOfFirstItemTareasTerminadas = indexOfLastItemTareasTerminadas - itemsPerPage;
const currentTareasTerminadas = tareasTerminadas.slice(
  indexOfFirstItemTareasTerminadas,
  indexOfLastItemTareasTerminadas
);

return (
  <Container
    maxWidth="xl"
    style={{
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "4px",
    }}
  >
    <Box
      style={{
        marginBottom: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Mantención de Vehículos
      </Typography>
<Button
  variant="contained"
  onClick={handleEnviarAlertaMeson}
  style={{ textTransform: "none", marginBottom: "20px" }}
>
  Enviar Alerta
</Button>
    </Box>

    <Box
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Tareas sin terminar
        </Typography>
        <div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentNotificaciones.length > 0 ? (
                  currentNotificaciones.map((notificacion) => (
                    <tr key={notificacion._id}>
                      <td>{notificacion.titulo}</td>
                      <td>{notificacion.descripcion}</td>
                      <td>{new Date(notificacion.fechaCreacion).toLocaleDateString("es-ES")}</td>
                      <td>
                        {!notificacion.terminada && (
                          <>
                            <IconButton onClick={() => handleEditarNotificacion(notificacion)}><EditIcon /></IconButton>
                            <IconButton onClick={() => handleVerNotificacion(notificacion)}><VisibilityIcon /></IconButton>
                            <IconButton onClick={() => handleEliminarNotificacion(notificacion)}><DeleteIcon /></IconButton>
                            <Button variant="contained" color="success" startIcon={<CheckIcon />} onClick={() => handleMarcarComoTerminada(notificacion)} style={{ textTransform: "none" }}>Marcar como terminada</Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>No hay notificaciones disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            count={Math.ceil(notificaciones.length / itemsPerPage)}
            page={currentPageNotificaciones}
            onChange={handlePageChangeNotificaciones}
            style={{ marginTop: "10px" }}
          />
        </div>
      </Box>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Tareas terminadas
        </Typography>
        <div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentTareasTerminadas.length > 0 ? (
                  currentTareasTerminadas.map((notificacion) => (
                    <tr key={notificacion._id}>
                      <td>{notificacion.titulo}</td>
                      <td>{notificacion.descripcion}</td>
                      <td>{new Date(notificacion.fechaCreacion).toLocaleDateString("es-ES")}</td>
                      <td>
                        <Button variant="contained" startIcon={<UndoIcon />} onClick={() => handleMarcarComoNoTerminada(notificacion)} style={{ textTransform: "none" }}>Marcar como no terminada</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>No hay tareas terminadas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            count={Math.ceil(tareasTerminadas.length / itemsPerPage)}
            page={currentPageTareasTerminadas}
            onChange={handlePageChangeTareasTerminadas}
            style={{ marginTop: "10px" }}
          />
        </div>
      </Box>
    </Box>

    <Modal
      open={openEditarModal}
      onClose={handleCloseEditarModal}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Editar Notificación
        </Typography>
        {selectedNotificacion && (
          <React.Fragment>
            <TextField
              label="Título"
              value={editedTitulo}
              onChange={(e) => setEditedTitulo(e.target.value)}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Descripción"
              value={editedDescripcion}
              onChange={(e) => setEditedDescripcion(e.target.value)}
              fullWidth
              style={{ marginBottom: "10px" }}
            />
            <Button
              variant="contained"
              onClick={handleGuardarCambios}
              style={{ textTransform: "none" }}
            >
              Guardar Cambios
            </Button>
          </React.Fragment>
        )}
      </div>
    </Modal>

    <Modal
      open={openVisualizarModal}
      onClose={handleCloseVisualizarModal}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "4px",
          width: "400px", // Ajusta el ancho según tus necesidades
        }}
      >
        <Typography variant="h6" gutterBottom>
          Detalles de la Notificación
        </Typography>
        {selectedNotificacion && (
          <React.Fragment>
            <Typography variant="body1" gutterBottom>
              Título: {selectedNotificacion.titulo}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Descripción: {selectedNotificacion.descripcion}
            </Typography>
          </React.Fragment>
        )}
      </div>
    </Modal>
  </Container>
);

};

export default ManejoNotificaciones;
