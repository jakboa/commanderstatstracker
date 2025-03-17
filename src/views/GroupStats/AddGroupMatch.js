import React, {useState} from "react";

import ScryFallAPIConnector from "../../utils/api/ScryFallAPIConnector";
import SearchHandler from "../../components/SearchHandler";

import "./GroupPage.css";

import Modal  from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Button  from "react-bootstrap/Button";

import AysncSelect from 'react-select/async';



export default function AddGroupMatch(props) {

    const [matchResults, setMatchResults] = useState(SearchHandler.makeNewMatchResults(props.groupname,props.group));
    const valueControll = [1,2,3,4];
    //Bad hardcoded values, very bad!
    const yearDisplay = ["2021","2022","2023","2024","2025"];
    // These two are used for delaying the fetch of commanders so its not to greedy, 
    // can edit the milliseconds with timeOutTime.
    let timeOutId;
    const timeOutTime = 800;

    const commanderFilters = (card) => {
        const findLegendaryCreatures = /Legendary.*Creature/i;
        const uniqueCommanders = ["Grist, the Hunger Tide"];
        const plainswalkerCommanders = "can be your commander";
        const backgroundEnchantments = "Background";
         
        return findLegendaryCreatures.test(card.type_line) ||
            card.name.includes(uniqueCommanders) ||
            card.oracle_text?.includes(plainswalkerCommanders) ||
            card.type_line.includes(backgroundEnchantments) 
    }

    //isMulti

    console.log(matchResults);


    // This function deals with finding the commander each player used for the match.
    const getOptions = async (searchValue) => {
        try {
        // First get all cards that fitt the name.
        const cardOptions = await ScryFallAPIConnector.getAutoCompleteCommander(searchValue);
        

        if (!cardOptions?.length) return [];

        // Make the result fitt the get bulk card API call. 
        //OLD Personal note: () in map is used to say its a object + name will be the key and the string the value.
        const formatedCardSearch = cardOptions.map(name => {
            const frontFace = name.includes("//") ? name.split(" // ")[0] : name;
            return { name:frontFace };
        });

        // Get info about the cards that fit.
        const cardInfo = await ScryFallAPIConnector.getGroupCommanderData(formatedCardSearch);

        const filteredCommanders = cardInfo.data.filter(card => 
            commanderFilters(card)
        );

        const finalShow = filteredCommanders.flatMap( commander =>  {
            if (commander.card_faces) {
                return commander.card_faces.map(face => (
                     { value: face.name, label: face.name }
                ))
                //const cardSide = commander.card_faces.find(cardFace => cardFace.name.includes(searchValue));
                //return { value: cardSide.name, label: cardSide.name }
                
            } else return { value: commander.name, label: commander.name }
        });

        
        console.log("getOptions", searchValue,cardOptions,formatedCardSearch,cardInfo,filteredCommanders, finalShow);

        return finalShow;

    } catch (error) {
        console.error("ScryFall API Error:", error.response || error.message || error);
        console.log("Error fetching data from ScryFall:", error);
        return [];
    }
          
    };

    const handleCommanderChange = (selectedOption, index) => {

        setMatchResults((prev) => {
            const updatedCommander = [...prev.results];
            updatedCommander[index].commander = selectedOption.value;
            return {
                ...prev,
                results: updatedCommander
            };
        })
    };

    const handlePlacementChange = (e, index) => {
        setMatchResults((prev) => {
            const updatedPlacement = [...matchResults.results];
            updatedPlacement[index].placement = Number(e.target.value);
            updatedPlacement.sort((a,b)=>a.placement - b.placement);

            return {
                ...prev,
                results: updatedPlacement
            };
        });
    };

    const handleYearChange = (e) => {
        setMatchResults({
            ...matchResults,
            year:e.target.value
        });
    };

    const handResetAddMatch = () => {
        //props.onHide();
        setMatchResults(SearchHandler.makeNewMatchResults(props.groupname,props.group))
    };



    return (
        <Modal {...props} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>REGISTER NEW MATCH.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Group: {props.groupname}</h4>
                <Form className="d-flex flex-column">
                    <table className="w-100">
                        <colgroup>
                            <col style={{width:'10%'}} />
                            <col style={{width:'40%'}} />
                            <col style={{width:'50%'}} />
                        </colgroup>
                        <thead>
                            <tr className="text-center">
                                <th>Placement</th>
                                <th>Player</th>
                                <th>Commander</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {props.group.arrayPlayerNicks.map((_, index) => {
                                return (
                                    <tr key={index} className={`place${matchResults.results[index].placement-1}`}>
                                        <td className="py-2 ps-2">
                                            <Form.Select onChange={(e) => handlePlacementChange(e,index)}
                                                value={matchResults.results[index].placement}>
                                                {valueControll.map((option, index) => {
                                                    return (
                                                        <option key={index} value={option}>{option}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </td>

                                        <td className="text-center">{matchResults.results[index].playerNick}</td>
                                        
                                        <td className="pe-2">
                                            <AysncSelect loadOptions={(inputValue,callback) => {
                                                clearTimeout(timeOutId);
                                                timeOutId = setTimeout(async () => {
                                                    const options = await getOptions(inputValue);
                                                    callback(options);
                                                },timeOutTime)
                                            }}
                                                value={
                                                    {value:matchResults.results[index].commander,
                                                     label:matchResults.results[index].commander
                                                    }
                                                }
                                        
                                                onChange={(selectedOption) =>handleCommanderChange(selectedOption,index)}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Form.Group className="place2 my-2 p-2 rounded d-inline-flex  mx-auto justify-content-center">
                        <Form.Label className="mt-2 text-end me-1">Select year played:</Form.Label>
                        <Form.Select className="w-auto"
                            onChange={(e) => handleYearChange(e)}>
                            {yearDisplay.map((option, index) => {
                                return (
                                    <option key={index} value={option}>{option}</option>
                                    )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="bg-danger border-danger" onClick={ handResetAddMatch}>Abort!</Button>
                <Button className="bg-success border-success" onClick={props.onHide}>Ship it!</Button>
            </Modal.Footer>

        </Modal>
    )
}