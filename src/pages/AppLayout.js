import React from 'react'
import { Outlet } from 'react-router-dom';
import '../styles/AppLayout.css'
import Header from "./Header"

const AppLayout = () => {
  return (
    <div
      id="Fondo"
    >
      <Header />
      <Outlet />
    </div>
  )
}

export default AppLayout