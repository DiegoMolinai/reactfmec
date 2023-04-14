import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function getProductos() {
      try {
        const response = await axios.get('http://localhost:9000/api/productos');
        setProductos(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map(producto => (
          <li key={producto._id}>{producto.nombre} - {producto.precio}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
