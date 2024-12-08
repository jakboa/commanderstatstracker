import React from "react";
import SearchHandler from "../../components/SearchHandler";



export default function GroupInfo( { group } ) {

    console.log(group);

    const test = SearchHandler.getGroupInfo(group);

    console.log(test);

    return (
        <>
            <p>Info about the group:</p>
            <p>TO ADD:</p>
            <p>INSERT: Player names.</p>
            <p>INSERT: Top used commanders.</p>
            <p>INSERT: Top winning commanders.</p>
            <p>Fun fact 1.</p>
            <p>Fun fact 2.</p>
        </>
    );
};


