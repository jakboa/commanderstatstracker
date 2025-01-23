import React from "react";
import { useNavigate } from "react-router-dom";

import homeSvg from "../utils/house-door-fill.svg";
import Arrow1 from "../utils/arrow-left-circle-fill.svg";
import Arrow2 from "../utils/arrow-right-circle.svg";

// Here I import Bootstrap stuff
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function Navigation() {

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
                <Button onClick={ goBack } className="m-1"> <img src={Arrow1} alt="HomeButton" /></Button>
                <Button onClick={ goHome } className="m-1"><img src={homeSvg} alt="HomeButton" /></Button>
                <Button onClick={ goForward } className="m-1" ><img src={Arrow2} alt="HomeButton" /></Button>
            </Col>
        </Row>
    )
}