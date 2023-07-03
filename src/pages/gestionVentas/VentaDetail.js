import { Grid, Typography } from "@mui/material";

const VentaDetail = ({ serviciosSeleccionados, productosSeleccionados }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Detalle de la Venta
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Servicios Seleccionados:
        </Typography>
        {serviciosSeleccionados.length > 0 ? (
          serviciosSeleccionados.map((servicio) => (
            <Typography key={servicio._id} variant="body1">
              - {servicio.name}
            </Typography>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No se han seleccionado servicios.
          </Typography>
        )}
        <Typography variant="subtitle1" gutterBottom>
          Productos Seleccionados:
        </Typography>
        {productosSeleccionados.length > 0 ? (
          productosSeleccionados.map((producto) => (
            <Typography key={producto._id} variant="body1">
              - {producto.nombre}
            </Typography>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No se han seleccionado productos.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default VentaDetail;
