import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Title from "./Title";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import Dashboard from "../Dashboard";
import Notificaciones from "../barraLateralNavegador/Notificaciones";
import Clientes from "../barraLateralNavegador/Clientes";
import Reportes from "../barraLateralNavegador/Reportes";
import Integraciones from "../barraLateralNavegador/Integraciones";

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: 400, // Ajusta la altura máxima según tus necesidades
    overflowY: "auto",
  },
});

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const classes = useStyles();
  const [info, setInfo] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [columnFilters, setColumnFilters] = React.useState({});
  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [appliedFilters, setAppliedFilters] = React.useState({});
  const [filteredData, setFilteredData] = React.useState([]);
  const [nombreFilter, setNombreFilter] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState('Dashboard');


  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/productos");
      setInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleColumnFilterChange = (column, value) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value !== "" ? value : undefined,
    }));

    const updatedFilters = {
      ...columnFilters,
      [column]: value !== "" ? value : undefined,
    };

    // Filtrar los datos utilizando los filtros actualizados
    const newFilteredData = info.filter((row) => {
      for (const [column, value] of Object.entries(updatedFilters)) {
        if (value !== undefined && row[column] !== value) {
          return false;
        }
      }
      if (nombreFilter && !row.nombre.includes(nombreFilter)) {
        return false;
      }
      return true;
    });

    // Actualizar los datos filtrados y marcar los filtros como aplicados
    setFilteredData(newFilteredData);
    setFiltersApplied(true);
  };

  const resetFilters = () => {
    setColumnFilters({});
    setNombreFilter("");
    setFilteredData(info);
    setFiltersApplied(false);
  };

  const applyFilters = () => {
    const newFilteredData = info.filter((row) => {
      for (const [column, value] of Object.entries(columnFilters)) {
        if (value !== undefined && row[column] !== value) {
          return false;
        }
      }
      if (nombreFilter && !row.nombre.includes(nombreFilter)) {
        return false;
      }
      return true;
    });

    setFilteredData(newFilteredData);
    setFiltersApplied(true);
  };

  const clearFilters = () => {
    setColumnFilters({});
  };
  const renderComponent = () => {
    switch (selectedOption) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Orders':
        return <Notificaciones />;
      case 'Customers':
        return <Clientes />;
      case 'Reports':
        return <Reportes />;
      case 'Integrations':
        return <Integraciones />;
      default:
        return null;
    }
  };
  

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(0, 10).map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>
                  {row.precio.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link color="primary" href="#" onClick={handleOpen} sx={{ mt: 3 }}>
        See more orders
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          style: { maxHeight: "80vh", maxWidth: "none" },
        }}
      >
        <DialogTitle>More Orders</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle1">Filter by:</Typography>
                <Box ml={2}>
                  <FormControl>
                    <TextField
                      value={nombreFilter}
                      placeholder="Nombre"
                      onChange={(event) => setNombreFilter(event.target.value)}
                    />
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle1">Filter by:</Typography>
                <Box ml={2}>
                  <FormControl style={{ width: "auto" }}>
                    <Select
                      value={columnFilters.precio || ""}
                      onChange={(event) =>
                        handleColumnFilterChange("precio", event.target.value)
                      }
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <em>Precio</em>;
                        }
                        return selected;
                      }}
                    >
                      {Array.from(new Set(info.map((row) => row.precio))).map(
                        (precio) => (
                          <MenuItem key={precio} value={precio}>
                            {precio}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Box>
                <Box ml={2}>
                  <FormControl style={{ width: "auto" }}>
                    <Select
                      value={columnFilters.tipo || ""}
                      onChange={(event) =>
                        handleColumnFilterChange("tipo", event.target.value)
                      }
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <em>Tipo</em>;
                        }
                        return selected;
                      }}
                    >
                      {Array.from(new Set(info.map((row) => row.tipo))).map(
                        (tipo) => (
                          <MenuItem key={tipo} value={tipo}>
                            {tipo}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Box>
                <Box ml={2}>
                  <FormControl style={{ width: "auto%" }}>
                    <Select
                      value={columnFilters.fecha || ""}
                      onChange={(event) =>
                        handleColumnFilterChange("fecha", event.target.value)
                      }
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <em>Fecha</em>;
                        }
                        return selected;
                      }}
                    >
                      {Array.from(new Set(info.map((row) => row.fecha))).map(
                        (fecha) => (
                          <MenuItem key={fecha} value={fecha}>
                            {fecha}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Box>
                <Box ml={2} alignSelf="flex-end">
                  <Button variant="contained" onClick={applyFilters}>
                    Aplicar filtro
                  </Button>
                </Box>
                <Box ml={2} alignSelf="flex-end">
                  <Button variant="contained" onClick={resetFilters}>
                    Reiniciar filtros
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(0, 10).map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>
                  {row.precio.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

          {filtersApplied && filteredData.length === 0 && (
            <Alert severity="info">
              No se encontraron elementos con los filtros seleccionados.
            </Alert>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
