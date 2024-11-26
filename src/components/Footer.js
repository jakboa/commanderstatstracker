import React from "react";
import { useNavigate } from "react-router-dom";


// Here I import Bootstrap stuff
import Button  from 'react-bootstrap/Button';


export default function Footer() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(1);
    };
    
    return (
        <div className="footer">
            <Button onClick={ goBack } >BACK</Button>
            <Button onClick={ goForward } >FORWARD</Button>
        </div>
    )
}