import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirige a la página de ventas
    navigate("/ventas");
  };
  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <div className="login-form-container">
            <h1 className="text-center mb-5">Login</h1>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@correo.xyz" />
                <Form.Text className="text-muted">
                  Nunca compartiremos tu correo a nadie.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" />
              </Form.Group>

              <Button variant="primary" type="submit" className="btn-block">
                Ingresar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Login;
