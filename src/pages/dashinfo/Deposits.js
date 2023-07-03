import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/productos');
      const totalPrice = response.data.reduce(
        (accumulator, product) => accumulator + product.precio,
        0
      );
      setTotal(totalPrice);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        {new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'CLP'
        }).format(total)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}