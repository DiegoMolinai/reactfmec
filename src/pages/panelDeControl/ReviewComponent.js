import React from "react";
import { Box, Container, Typography, Button, Modal, Grid } from "@mui/material";

// Componente del modal
const CustomModal = ({ open, onClose, title, fileUrl }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800, // Ajusta el ancho del modal según sea necesario
          height: 600, // Ajusta la altura del modal según sea necesario
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <embed
          src={fileUrl}
          width="100%"
          height="100%"
          type="application/pdf"
        />
        <Button
          variant="outlined"
          href={fileUrl}
          target="_blank"
          download
          style={{ marginTop: "10px" }}
        >
          Descargar PDF
        </Button>
        <Button onClick={onClose}>Cerrar</Button>
      </Box>
    </Modal>
  );
};

// Componente principal
const ReviewComponent = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [fileUrl, setFileUrl] = React.useState("");

  const handleModalOpen = (type, fileName) => {
    const url = `http://localhost:8080/${fileName}`;
    setFileUrl(url);
    setModalTitle(`Reporte de ${type}`);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    my: 2,
  }}
>
  <Typography variant="h4" component="h1" gutterBottom>
    Revisión de Datos
  </Typography>
  <div style={{ width: "100%" }}>
    <Button
      variant="contained"
      onClick={() => handleModalOpen("Usuarios", "UsuariosReport.pdf")}
      sx={{ mt: 2, width: "100%", fontSize: "3rem" }}
      style={{border:"5px solid black"}}
    >
      Reporte Usuarios
    </Button>
  </div>
  <div style={{ width: "100%" }}>
    <Button
      variant="contained"
      onClick={() => handleModalOpen("Inventario", "InventarioReport.pdf")}
      sx={{ mt: 2, width: "100%", fontSize: "3rem" }}
      style={{border:"5px solid black"}}
    >
      Reporte Inventario
    </Button>
  </div>
  <div style={{ width: "100%" }}>
    <Button
      variant="contained"
      onClick={() => handleModalOpen("Ventas", "VentasReport.pdf")}
      sx={{ mt: 2, width: "100%", fontSize: "3rem" }}
      style={{border:"5px solid black"}}
    >
      Reporte Ventas
    </Button>
  </div>
  <div style={{ width: "100%" }}>
    <Button
      variant="contained"
      onClick={() => handleModalOpen("Productos", "ProductosReport.pdf")}
      sx={{ mt: 2, width: "100%", fontSize: "3rem" }}
      style={{border:"5px solid black"}}
    >
      Reporte Productos
    </Button>
  </div>
  <div style={{ width: "100%" }}>
    <Button
      variant="contained"
      onClick={() => handleModalOpen("Servicios", "ServiciosReport.pdf")}
      sx={{ mt: 2, width: "100%", fontSize: "3rem" }}
      style={{border:"5px solid black"}}
    >
      Reporte Servicios
    </Button>
  </div>
  <div style={{ width: "100%" }}>
    <Button
      variant="contained"
      onClick={() =>
        handleModalOpen("Notificaciones", "NotificacionesReport.pdf")
      }
      sx={{ mt: 2, width: "100%", fontSize: "3rem" }}
      style={{border:"5px solid black"}}
    >
      Reporte Notificaciones
    </Button>
  </div>
  <CustomModal
    open={modalOpen}
    onClose={handleModalClose}
    title={modalTitle}
    fileUrl={fileUrl}
  />
</Box>

    </Container>
  );
};

export default ReviewComponent;
