import * as React from "react";
import {
  Typography,
  Box,
  Container,
  Modal,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Pagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import UndoIcon from "@mui/icons-material/Undo";
import Swal from "sweetalert2";

const ColumnHeaders = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        border: "3px solid black",
      }}
    >
      <Box style={{ width: "25%" }}>
        <Typography variant="subtitle1" align="center">
          Título
        </Typography>
      </Box>
      <Box style={{ width: "35%" }}>
        <Typography variant="subtitle1" align="center">
          Descripción
        </Typography>
      </Box>
      <Box style={{ width: "20%" }}>
        <Typography variant="subtitle1" align="center">
          Fecha
        </Typography>
      </Box>
      <Box style={{ width: "20%" }}>
        <Typography variant="subtitle1" align="center">
          Acciones
        </Typography>
      </Box>
    </Box>
  );
};

const ManejoNotificaciones = () => {
  const [notificaciones, setNotificaciones] = React.useState([]);
  const [tareasTerminadas, setTareasTerminadas] = React.useState([]);
  const [selectedNotificacion, setSelectedNotificacion] = React.useState(null);
  const [openEditarModal, setOpenEditarModal] = React.useState(false);
  const [openVisualizarModal, setOpenVisualizarModal] = React.useState(false);
  const [editedTitulo, setEditedTitulo] = React.useState("");
  const [editedDescripcion, setEditedDescripcion] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [currentPageNotificaciones, setCurrentPageNotificaciones] = React.useState(1);
  const [currentPageTareasTerminadas, setCurrentPageTareasTerminadas] = React.useState(1);
  const [itemsPerPagePagination] = React.useState(10);
  const [itemsPerPage] = React.useState(5);
  const [itemsPerPageNewPage] = React.useState(2);
  const itemsPerPageWithNewPage = itemsPerPagePagination + itemsPerPageNewPage;

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

  const handleEnviarAlertaMeson = () => {
    Swal.fire({
      title: "Enviar alerta al mesón",
      text: "Ingrese el contenido de la alerta:",
      input: "textarea",
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debe ingresar el contenido de la alerta";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const alertContent = result.value;
        // Realiza las operaciones necesarias con el contenido de la alerta
        setShowAlert(true);
        Swal.fire("¡Se ha enviado una alerta al mesón!", "", "success");
      }
    });
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

  const handleMarcarComoNoTerminada = async (notificacion) => {
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

  React.useEffect(() => {
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
      style={{
        backgroundColor: "#ffffff",
        padding: "10px",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box style={{ width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          Mantención de Vehículos
        </Typography>
        <Button
          variant="contained"
          onClick={handleEnviarAlertaMeson}
          style={{ textTransform: "none", width: "100%" }}
        >
          Enviar Alerta
        </Button>
        <Typography variant="h6" gutterBottom>
          Tareas sin terminar
        </Typography>
        <ColumnHeaders />
        <div style={{ maxHeight: "250px", overflowY: "auto" }}>
          <Table>
            <TableBody>
              {currentNotificaciones.length > 0 ? (
                currentNotificaciones.map((notificacion) => (
                  <TableRow key={notificacion._id} style={{backgroundColor:"lightgreen"}}>
                    <TableCell align="center" style={{ width: "25%", border: "3px solid black", fontWeight:"bold" }}>
                      {notificacion.titulo}
                    </TableCell>
                    <TableCell align="center" style={{ width: "35%", border: "3px solid black", fontWeight:"bold" }}>
                      {notificacion.descripcion}
                    </TableCell>
                    <TableCell align="center" style={{ width: "20%", border: "3px solid black", fontWeight:"bold" }}>
                      {new Date(
                        notificacion.fechaCreacion
                      ).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell align="center" style={{ width: "20%", border: "3px solid black", fontWeight:"bold" }}>
                      {!notificacion.terminada && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <IconButton
                              onClick={() =>
                                handleEditarNotificacion(notificacion)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleVerNotificacion(notificacion)
                              }
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </div>
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<CheckIcon />}
                            onClick={() =>
                              handleMarcarComoTerminada(notificacion)
                            }
                            style={{ textTransform: "none", border:"3px solid black"}}
                          >
                            Marcar como terminada
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    No hay notificaciones disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination
          count={Math.ceil(notificaciones.length / itemsPerPageWithNewPage)}
          page={currentPageNotificaciones}
          onChange={handlePageChangeNotificaciones}
          style={{ marginTop: "10px" }}
        />
      </Box>

      <Box style={{ width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Tareas terminadas
        </Typography>
        <ColumnHeaders />
        <div style={{ maxHeight: "250px", overflowY: "auto" }}>
          <Table>
            <TableBody>
              {currentTareasTerminadas.length > 0 ? (
                currentTareasTerminadas.map((notificacion) => (
                  <TableRow key={notificacion._id} style={{backgroundColor:"lightcoral"}}>
                    <TableCell align="center" style={{ width: "25%", border: "3px solid black", fontWeight:"bold" }}>
                      {notificacion.titulo}
                    </TableCell>
                    <TableCell align="center" style={{ width: "35%", border: "3px solid black", fontWeight:"bold" }}>
                      {notificacion.descripcion}
                    </TableCell>
                    <TableCell align="center" style={{ width: "20%", border: "3px solid black", fontWeight:"bold" }}>
                      {new Date(
                        notificacion.fechaCreacion
                      ).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell align="center" style={{ width: "20%", border: "3px solid black", fontWeight:"bold" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <IconButton
                            onClick={() => handleVerNotificacion(notificacion)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditarNotificacion(notificacion)}
                          >
                            <EditIcon />
                          </IconButton>
                        </div>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<UndoIcon />}
                          onClick={() =>
                            handleMarcarComoNoTerminada(notificacion)
                          }
                          style={{ textTransform: "none", border:"3px solid black" }}
                        >
                          Marcar como no terminada
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    No hay tareas terminadas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination
          count={Math.ceil(tareasTerminadas.length / itemsPerPageWithNewPage)}
          page={currentPageTareasTerminadas}
          onChange={handlePageChangeTareasTerminadas}
          style={{ marginTop: "10px" }}
        />
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
