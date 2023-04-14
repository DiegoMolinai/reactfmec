import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <hr></hr>
      <Row className="justify-content-center">
        <Col md={6} xs={12}>
          <Row className="mb-2 align-items-center justify-content-center">
            <Col>
              <Button variant="primary" block>
                <img src="https://pbs.twimg.com/media/Fjz1eSyWQAAQYwk.jpg:large" alt="Botón 1" className="mr-2" style={{maxWidth:"100%",height:"auto"}} />
                VENTAS
              </Button>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col>
              <Button variant="primary" block>
                <img src="https://pbs.twimg.com/media/Fjz1eSyWQAAQYwk.jpg:large" alt="Botón 2" className="mr-2" style={{maxWidth:"100%",height:"auto"}} />
                INVENTARIO
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={6} xs={12}>
          <Row className="mb-2 align-items-center justify-content-center">
            <Col>
              <Button variant="primary" block>
                <img src="https://pbs.twimg.com/media/Fjz1eSyWQAAQYwk.jpg:large" alt="Botón 3" className="mr-2" style={{maxWidth:"100%",height:"auto"}} />
                Botón 3
              </Button>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col>
              <Button variant="primary" block>
                <img src="https://pbs.twimg.com/media/Fjz1eSyWQAAQYwk.jpg:large" alt="Botón 4" className="mr-2" style={{maxWidth:"100%",height:"auto"}} />
                Botón 4
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr></hr>
    </Container>
  );
};

export default Home;