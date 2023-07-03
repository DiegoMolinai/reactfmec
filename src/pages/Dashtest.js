import React, { useState } from 'react';
import { ThemeProvider } from '@mui/styles';
import { createTheme, Grid, Paper, Typography, List, ListItem, ListItemText, Drawer } from '@mui/material';
import Clientes from './barraLateralNavegador/Clientes';
import Reportes from './barraLateralNavegador/Reportes';
import Notificaciones from './barraLateralNavegador/Notificaciones';
import Integraciones from './barraLateralNavegador/Integraciones';

const theme = createTheme({
  overrides: {
    MuiPaper: {
      root: {
        padding: '16px',
        textAlign: 'center',
        color: 'black',
      },
    },
  },
});

const Dashboard = ({ component }) => {
  return (
    <Grid item xs={9}>
      <Paper>
        {component}
      </Paper>
    </Grid>
  );
};

const Dashtest = () => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const options = [
    'Clientes',
    'Reportes',
    'Notificaciones',
    'Integraciones',
  ];

  const renderComponent = () => {
    switch (selectedOption) {
      case 0:
        return <Clientes />;
      case 1:
        return <Reportes />;
      case 2:
        return <Notificaciones />;
      case 3:
        return <Integraciones />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Drawer variant="permanent" anchor="left">
            <List component="nav">
              {options.map((option, index) => (
                <ListItem
                  button
                  key={index}
                  selected={selectedOption === index}
                  onClick={() => handleOptionClick(index)}
                >
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Grid>
        <Dashboard component={renderComponent()} />
      </Grid>
    </ThemeProvider>
  );
};

export default Dashtest;
