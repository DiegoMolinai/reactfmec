import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Ventas from "./pages/Ventas";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Lista from "./pages/Lista";
import Admin from "./pages/Admin";
import Inventario from "./pages/Inventario";
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"; 
import Dashtest from "./pages/Dashtest";
import ReviewComponent from "./pages/panelDeControl/ReviewComponent"
import ServiceManagementApp from "./pages/gestionServicios/ServiceManagementApp";
import VentasManagementApp from "./pages/gestionVentas/VentasManagementApp";
import RevisionManagementApp from "./pages/gestionRevision/RevisionManagementApp";
import RecibirSolicitud from "./pages/recibirSolicitud/RecibirSolicitud";
import ManejoNotificaciones from "./pages/manejarNotificaciones/ManejoNotificaciones";
import ListaVentas from "./pages/testeo/ListaVentas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<SignIn />} />
          <Route path="ventas" element={<ListaVentas />} />
          <Route path="login" element={<SignIn />} />
          <Route path="admin" element={<ManejoNotificaciones />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="reportes" element ={<ReviewComponent />}/>
          <Route path="servicios" element={<ServiceManagementApp />} />
          <Route path="revision" element={<RevisionManagementApp/>} />
          <Route path="recibir" element={<RecibirSolicitud/>} />
          <Route path="notificaciones" element={<ManejoNotificaciones/>}/>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
