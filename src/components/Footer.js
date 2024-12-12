import React from "react";
import { useNavigate } from "react-router-dom";


// Here I import Bootstrap stuff
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function Footer() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(1);
    };

    const goHome = () => {
        navigate('/');
    };

    return (
        <Row >
            <Col className="footer d-flex justify-content-center">
                <Button onClick={ goBack } className="m-1">BACK</Button>
                <Button onClick={ goHome } className="m-1">Homepage</Button>
                <Button onClick={ goForward } className="m-1" >FORWARD</Button>
            </Col>
        </Row>
    )
}