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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="login" element={<SignIn />} />
          <Route path="lista" element={<Lista />} />
          <Route path="admin" element={<Admin />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="reportes" element ={<Dashboard/>}/>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
