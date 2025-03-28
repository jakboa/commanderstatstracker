import React, { useState } from "react";

import { AnimatePresence, motion } from "motion/react"

//import CommanderCard from "./CommanderCard";
import CommanderCardAlt from "./CommanderCardAlt";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function CommanderCardContainer( { playerName, commanderStatsInfo, years, loading  } ) {

    const [sort, setSort] = useState("Default");
    console.log(commanderStatsInfo);

    const sortCommanders = (e) => {
        
        const sortings = { "1":"matches", "games":"matches" };

        if (e.target.value === "name") {
            commanderStatsInfo.sort((a,b)=> a[e.target.value].localeCompare(b[e.target.value]));
        } else if (sortings[e.target.value] === "matches") {
            commanderStatsInfo.sort((a,b)=> b.matchHistory.allMatches[e.target.value] - a.matchHistory.allMatches[e.target.value]);
        } else {
            commanderStatsInfo.sort((a,b)=> b[e.target.value] - a[e.target.value]);
        };

        if (true) {
            commanderStatsInfo.sort((a,b)=> {
                const a_SummedStats = years.reduce((accumulator, year) =>{
                    const yearData = a.matchHistory[year] || {};
                    Object.keys(yearData).slice(0,5).forEach(placement => {
                      accumulator[placement] +=  yearData[placement];
                    })
                    return accumulator;
                  },{1:0,2:0,3:0,4:0,games:0});
                const b_SummedStats = years.reduce((accumulator, year) =>{
                    const yearData = b.matchHistory[year] || {};
                    Object.keys(yearData).slice(0,5).forEach(placement => {
                      accumulator[placement] +=  yearData[placement];
                    })
                    return accumulator;
                  },{1:0,2:0,3:0,4:0,games:0});

                return b_SummedStats[e.target.value] - a_SummedStats[e.target.value]
            });


        };

        setSort(e.target.value);

    };


    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-2">
                <h1 className="border border-bottom-0 border-black border-3 rounded-top mb-0 px-2 fw-semibold text-uppercase bg-info-subtle">{playerName}`s commanders</h1>
            </div>
            <div className="bg-info-subtle border border-black border-3 rounded-4 p-3">
                <Row>
                    <div className="d-flex">
                        <p className="pt-2 pe-1 mb-0 fw-bolder">Sort by: </p>
                        <Button variant="success" className="m-1" onClick={ sortCommanders } value={"name"}>Name</Button>
                        <Button variant="success" className="m-1" onClick={ sortCommanders } value={"1"}>Wins</Button>
                        <Button variant="success" className="m-1" onClick={ sortCommanders } value={"games"}>Played</Button>
                        <Button variant="success" className="m-1" onClick={ sortCommanders } value={"price"}>Price</Button>
                        <p className="pt-2 pe-1 mb-0 fw-bolder">Sorted by: {sort === "1" ? "FIRST" : sort.toUpperCase()}.</p>
                    </div>
                    { loading ? (
                        <p>...loading</p>
                    ) : (
                        commanderStatsInfo.map( (commander,index) => {
                            return (
                                <motion.div key={index} className="col-md-3 d-flex p-2">
                                <AnimatePresence>
                                    <motion.div 
                                        layout
                                        transition={{ type:"spring", stiffness:300, damping:20 }}>

                                            {/*<CommanderCard commander={ commander } years={ years } />*/}
                                            <CommanderCardAlt commander={ commander } years={ years } />
                                        
                                    </motion.div>
                                </AnimatePresence>
                                </motion.div>
                        )
                    }))
                }
                </Row>
            </div>
        </>
    )

}



