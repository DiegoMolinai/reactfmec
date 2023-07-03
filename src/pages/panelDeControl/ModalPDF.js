import React, { useState } from 'react';
import ModalPDF from './ModalPDF';

function ReviewComponent() {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalContent, setUserModalContent] = useState('');

  const handleUserModalOpen = async () => {
    try {
      const response = await fetch('/api/usuarios');
      const data = await response.json();
      setUserModalContent(JSON.stringify(data, null, 2));
      setUserModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserModalClose = () => {
    setUserModalOpen(false);
  };

  return (
    <div>
      <h1>Componente de Revisión</h1>
      <button onClick={handleUserModalOpen}>Ver Usuarios</button>
      <ModalPDF
        open={userModalOpen}
        onClose={handleUserModalClose}
        title="Usuarios"
        content={userModalContent}
      />
    </div>
  );
}

export default ReviewComponent;
