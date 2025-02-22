import { FormEvent, useState } from "react";
import { Container, InputGroup } from "react-bootstrap";
import { Form as FormBootstrap } from 'react-bootstrap';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Form } from "react-router-dom";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Main function
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()


    }
    return (<>
        <Container className="simple-container">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <FormBootstrap.FloatingLabel label="Username">
                    <FormBootstrap.Control placeholder="Username" />
                </FormBootstrap.FloatingLabel>

                <InputGroup>
                    <FormBootstrap.FloatingLabel label="Password">
                        <FormBootstrap.Control placeholder="Password" />
                    </FormBootstrap.FloatingLabel>
                    {showPassword ? <FaRegEye onClick={handleShowPassword} /> : <FaRegEyeSlash onClick={handleShowPassword} />}
                </InputGroup>

                <a href="/forgot-password">Forgot Password</a>
            </Form>
        </Container>
    </>)
}