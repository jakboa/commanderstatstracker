import React from "react";

import ScryFallAPIConnector from "../../utils/api/ScryFallAPIConnector";

import Modal  from "react-bootstrap/Modal";
import Button  from "react-bootstrap/Button";
import AysncSelect from 'react-select/async';



export default function AddGroupMatch(props) {



    console.log(props);


    const getOptions = async (searchValue, callback) => {

        // First get all cards that fitt the name.
        const cardOptions = await ScryFallAPIConnector.getAutoCompleteCommander(searchValue);

        if (!cardOptions?.length) return callback([]);

        // Make the result fitt the get bulk card API call. 
        //Personal note: () in map is used to say its a object + name will be the key and the string the value.
        const formatedCardSearch = cardOptions.flatMap(name => {
            if (name.includes("//")) {
                return name.split(" // ").map(doubleSided => ({ name:doubleSided }))
            };
            return [{ name }]
        });
        // Get info about the cards that fitt.
        const cardInfo = await ScryFallAPIConnector.getGroupCommanderData(formatedCardSearch);
        const filterRegex = /Legendary(?:.*Creature| Plainswalker)/
        const filteredCommanders = cardInfo.data.filter(card => filterRegex.test(card.type_line));

        const check = filteredCommanders.flatMap( commander =>  {
            if (commander.card_faces) {
                commander.card_faces.forEach(card_face => {
                    console.log("HERE",card_face)
                    if (card_face.name.includes(searchValue)) return { value: card_face.name, label: card_face.name }
                })} else return { value: commander.name, label: commander.name }
        });

        const finalShow = filteredCommanders.map(card => ({ value: card.name, label: card.name }))

        
        console.log("getOptions", searchValue,cardOptions,formatedCardSearch,cardInfo,filteredCommanders, check);

        callback(finalShow);
          
    };

    return (
        <Modal {...props} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a match to record!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.groupname}</h4>
                {props.group.arrayPlayerNicks.map((player, index) => {
                    return (
                        <div key={index}>
                            <p>{player}</p>
                            <AysncSelect loadOptions={getOptions}/>
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