import React from "react";

import Modal  from "react-bootstrap/Modal";
import Button  from "react-bootstrap/Button";



export default function AddGroupMatch(props) {

    console.log(props);

    return (
        <Modal {...props} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a match to record!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.groupname}</h4>
                {props.group.arrayPlayerNicks.map(player => {
                    return (
                        <p>{player}</p>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button className="bg-danger border-danger" onClick={props.onHide}>Abort!</Button>
                <Button className="bg-success border-success" onClick={props.onHide}>Ship it!</Button>
            </Modal.Footer>

        </Modal>
    )
}