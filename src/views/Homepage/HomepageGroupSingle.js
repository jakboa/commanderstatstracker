import React from "react";


export default function HomepageSingleGroup( {groupName, groupPlayers} ) {

    return (
        <div>
            <p>{groupName}</p>
            <p>{groupPlayers}</p>
        </div>
    );
};