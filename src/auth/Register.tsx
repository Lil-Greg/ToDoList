import { FormEvent, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../index.css";
import { useMutation as useConvexMutation } from "convex/react";
import useGetUsers from "../backend/getUsers";
import { api } from "../../convex/_generated/api";
import { User } from "../libraries/types";
import { ErrorPage, LoadingPage } from "../state handling/StateHandling";

export default function Register() {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const profilePictureRef = useRef<HTMLInputElement | null>(null);

    const createUser = useConvexMutation(api.users.createUser);
    const { data, isLoading, isError, error } = useGetUsers();

    if (isLoading) {
        return <div className="center-state-handling"><LoadingPage /></div>
    }
    if (isError || data == undefined) {
        if (error == null) {
            return;
        }
        const newError = error;
        return <div className="center-state-handling"><ErrorPage error={newError} /></div>
    }
    const userCheck: User[] = data;
    let inputError = false;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let profilePicture;

        if ((!usernameRef || !passwordRef || !emailRef) || (usernameRef.current?.value == '' || passwordRef.current?.value == '' || emailRef.current?.value == '') || (usernameRef.current?.value === undefined || passwordRef.current?.value === undefined || emailRef.current?.value === undefined)) {
            inputError = true;
            return;
        }
        if (profilePictureRef === null || profilePictureRef === undefined) {
            profilePicture = undefined;
        }

        inputError = false;
        // less verbosity
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;

        //Checking and limiting file size
        if (profilePictureRef.current?.size !== undefined && profilePictureRef !== null && profilePictureRef.current.size > 10485760) {
            inputError = true
            return;
        }

        // Check if User is not already in system
        userCheck.map(userData => {
            if (userData.username == username || userData.password == password) {
                inputError = true;
                return;
            }
        });
        const formValues = {
            username: username,
            password: password,
            email: email,
            profilePicture: profilePicture,
        }
        createUser(formValues);


    }
    return (<>
        <Container className="simple-container">
            <h1 className="r-fh1">Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.FloatingLabel className="col-6 f-input" label="Email: name@example.com">
                    <Form.Control type="email" placeholder="Email: name@example.com" ref={emailRef} />
                </Form.FloatingLabel>
                <Row xs={1} lg={2}>
                    <Col>
                        <Form.FloatingLabel className="col-6 f-input" label="Username">
                            <Form.Control type="text" placeholder="Username" ref={usernameRef} />
                        </Form.FloatingLabel>
                    </Col>
                    <Col>
                        <Form.FloatingLabel className="col-6 f-input" label="Password">
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                        </Form.FloatingLabel>
                    </Col>
                </Row>
                <Form.Control type="file" accept="image/*" ref={profilePictureRef} /><br />
                {profilePictureRef.current?.size} bytes

                <Button type="submit">Submit</Button>
            </Form>
        </Container >
    </>)
}