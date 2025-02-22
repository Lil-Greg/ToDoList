import { Form } from "react-bootstrap";

export default function ForgotPassword() {
    return (<>
        <Form.FloatingLabel label="Your Email">
            <Form.Control type="email" placeholder="Your Email" />
        </Form.FloatingLabel>
    </>)
}