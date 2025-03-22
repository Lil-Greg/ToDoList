import { FormEvent, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../index.css";
import { useMutation as useConvexMutation, useQuery as useConvexQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import checkUserFn from "../backend/checkUser";

export default function Register() {
    // Friday, 3/21/2025 -> Priority:
    // Check if the user is being created,
    // Check if the user can be madde with the pfp or not

    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const profilePictureRef = useRef<HTMLInputElement | null>(null);

    const createUser = useConvexMutation(api.users.createUser);


    let inputErrorReasons = [
        "No Value for A Field",
        "Size of Picture is Too Large",
        "User already Exists"
    ];
    // let does not re-render the component, but I want to re-render
    // the component when an input error is found so the inputs can
    // error as well.
    const [inputError, setInputError] = useState<boolean>(false);// To set as attribute on different input fields
    const [inputErrorReason, setInputErrorReason] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let profilePicture;

        // Update Needed: Put All checks in an OnChange to Dynamically
        // Check if the
        if ((!usernameRef || !passwordRef || !emailRef) || (usernameRef.current?.value == '' || passwordRef.current?.value == '' || emailRef.current?.value == '') || (usernameRef.current?.value === undefined || passwordRef.current?.value === undefined || emailRef.current?.value === undefined)) {
            setInputError(true);
            setInputErrorReason(inputErrorReasons[2]);
            return;
        }
        if (profilePictureRef === null || profilePictureRef === undefined || profilePictureRef.current === null) {
            profilePicture = undefined;
        } else {
            profilePicture = profilePictureRef.current;
        }

        // inputError = false; use onChange instead
        // less verbosity
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;

        //Checking and limiting file size
        if (profilePictureRef.current?.size !== undefined && profilePictureRef !== null && profilePictureRef.current.size > 10485760) {
            setInputError(true);
            setInputErrorReason(inputErrorReasons[1]);
            return;
        }
        //if not too large, CONVERT THE IMG -> BLOB



        // Check if User is not already in system
        // I want to dynamically check this,
        // not just when the form is submitted
        const checkUser = checkUserFn({ username, email });
        if (checkUser) {
            setInputError(true);
            setInputErrorReason(inputErrorReasons[2]);
            // errorReason[2]
            return;
        }
        // I want to store img as a Binary Large Object (BLOB)
        // to do that I must: Get the img, Convert it to Binary,
        // then Send it Off (Change the schema first though lol)
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