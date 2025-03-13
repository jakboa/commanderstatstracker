import React, { useState } from "react";

import Modal  from "react-bootstrap/Modal";
import Button  from "react-bootstrap/Button";
import Select from 'react-select';



export default function AddGroupMatch(props) {

    const [searchCommander,setSearchCommander] = useState("")

    console.log(props);


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      console.log(searchCommander);

    const commanderSearch = (e) => {
        console.log('handleChange', e)
    }

    return (
        <Modal {...props} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a match to record!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.groupname}</h4>
                {props.group.arrayPlayerNicks.map(player => {
                    return (
                        <div>
                            <p>{player}</p>
                            <Select options={options} onChange={ commanderSearch }/>
                        </div>
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