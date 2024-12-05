import React from "react";

import "./MatchInfoBox.css";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from 'react-bootstrap/Image';
import matchFirstPlacePicture from '../../utils/matchFirstPlacePicture.png'
import matchSecondPlacePicture from '../../utils/matchSecondPlacePicture.png'
import matchThirdPlacePicture from '../../utils/matchThirdPlacePicture.png'
import matchFourthPlacePicture from '../../utils/matchFourthPlacePicture.png'


export default function MatchInfoSingle( { matchData } ) {

    const pictures = [ matchFirstPlacePicture, matchSecondPlacePicture, matchThirdPlacePicture, matchFourthPlacePicture ]

    return (
        <Row className=" d-flex align-items-center fs-4 text-center">
            <Col >
                <Image src={pictures[matchData.placement-1]} thumbnail className="matchPic playerBox" /> </Col>
            
            <Col >
                <p className="matchNickname playerBox">{matchData.nickName}</p> </Col>

            <Col >
                <p className="matchCommander playerBox">{matchData.commander}</p> </Col>

            <Col >
                <p className="matchPlacement playerBox">{matchData.placement}</p> </Col>
        </Row>
    );
};

