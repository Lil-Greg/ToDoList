import { FormEvent } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "../index.css";

export default function Register() {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Check if User is not already in system
    }
    return (<>
        <Container className="simple-container">
            <h1 className="r-fh1">Register</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.FloatingLabel className="col-6 f-input" label="Username">
                            <Form.Control placeholder="Username" />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel className="col-6 f-input" label="Password">
                            <Form.Control placeholder="Password" />
                        </Form.FloatingLabel>
                    </Col>
                </Row>
            </Form>
        </Container>
    </>)
}