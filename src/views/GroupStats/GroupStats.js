import React from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";



export default function GroupStats() {

    const { groupname } = useParams();

    

    return (
        <p>Her er groupStats for {groupname}!</p>
    );
};

