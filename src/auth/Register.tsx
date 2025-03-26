import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../index.css";
import { useMutation as useConvexMutation, useQuery as useConvexQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import "../../public/defaultPfp.png";
import addingImage from "../a-functions/addingImage";

export default function Register() {
    // Friday, 3/21/2025 -> Priority:
    // Check if the user is being created,
    // Check if the user can be madde with the pfp or not

    const [args, setArgs] = useState<{ username: string, email: string }>(
        {
            username: "", email: ""
        }
    );

    // useState will re-render the component, and when
    // re-rendered, this will be down again, resulting in
    // a change in the array and the boolean value.
    const checkUser = useConvexQuery(api.users.checkUser, args);
    const [checkUserToBoolean, setCheckUserToBoolean] = useState<boolean>(!!checkUser);

    useEffect(() => setCheckUserToBoolean(!!checkUser), [args]);

    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);

    const createUser = useConvexMutation(api.users.createUser);

    let inputErrorReasons = [
        "No Value for Username",
        "No Value for Password",
        "No Value for Email",
        "User already Exists"
    ];

    const handleOnChange = () => {

        if (!usernameRef || usernameRef.current?.value == '' || usernameRef.current?.value === undefined) {
            setInputError(true);
            setInputErrorReason(inputErrorReasons[0]);
            return;
        }
        if (!emailRef || emailRef.current?.value == '' || emailRef.current?.value === undefined) {
            setInputError(true);
            setInputErrorReason(inputErrorReasons[2]);
            return;
        }
        //Do Checks
        setArgs({
            username: usernameRef.current.value,
            email: emailRef.current.value
        })
    }

    // let does not re-render the component, but I want to re-render
    // the component when an input error is found so the inputs can
    // error as well.
    const [inputError, setInputError] = useState<boolean>(false);// To set as attribute on different input fields
    const [inputErrorReason, setInputErrorReason] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // 3/25/2025 Update: 
        // Not allowing pfp change in registration
        const imgPfp = await addingImage();
        if (imgPfp === undefined) {
            console.log("imgPfp is undefined", imgPfp);
            return;
        }

        // checks to prevent invalid data going into database
        if (!usernameRef || usernameRef.current?.value == '' || usernameRef.current?.value === undefined) {
            setInputError(true);
            setInputErrorReason(inputErrorReasons[0]);
            return;
        }
        if (!passwordRef || passwordRef.current?.value == '' || passwordRef.current?.value === undefined) {
            setInputError(true);
            setInputErrorReason(inputErrorReasons[1]);
            return;
        }
        if (!emailRef || emailRef.current?.value == '' || emailRef.current?.value === undefined) {
            setInputError(true);
            setInputErrorReason(inputErrorReasons[2]);
            return;
        }

        // less verbosity
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;

        // Check if User is not already in system
        // I want to dynamically check this,
        // not just when the form is submitted
        setArgs({ username, email });
        if (!checkUserToBoolean) {
            setInputError(true);
            setInputErrorReason(inputErrorReasons[3]);
            return;
        }
        // I want to store img as a Binary Large Object (BLOB)
        // to do that I must: Get the img, Convert it to Binary,
        // then Send it Off (Change the schema first though lol)
        const formValues = {
            username: username,
            password: password,
            email: email,
            profilePicture: imgPfp,
        }
        createUser(formValues);
    }

    /* //Trying to Dynamically watch the Profile Picture
    if (profilePictureRef === null || profilePictureRef === undefined || profilePictureRef.current === null) {
        setPfpState(undefined);
    } else {
        setPfpState(profilePictureRef.current);
    }
    */
    return (<>
        <Container className="container simple-container">
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
                <Button type="submit">Submit</Button>
            </Form>
        </Container >
    </>)
}