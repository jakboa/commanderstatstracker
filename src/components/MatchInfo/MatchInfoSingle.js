import React from "react";

import "./MatchInfoBox.css";

import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import Image from 'react-bootstrap/Image';
import matchFirstPlacePicture from '../../utils/matchFirstPlacePicture.png'
import matchSecondPlacePicture from '../../utils/matchSecondPlacePicture.png'
import matchThirdPlacePicture from '../../utils/matchThirdPlacePicture.png'
import matchFourthPlacePicture from '../../utils/matchFourthPlacePicture.png'


export default function MatchInfoSingle( { matchData } ) {

    const pictures = [ matchFirstPlacePicture, matchSecondPlacePicture, matchThirdPlacePicture, matchFourthPlacePicture ]

    return (
        <Col md={12} className=" fs-4 text-center matchplayerCol">
            <Stack direction="horizontal" className="p-3 matchplayerStack align-items-stretch" >
                <Image src={pictures[matchData.placement-1]} className="matchPic playerBox" />

                <p className="d-flex justify-content-center align-items-center  matchPlacement playerBox">{matchData.placement}</p>
            
                <p className="d-flex justify-content-center align-items-center matchNickname playerBox">{matchData.nickName}</p>

                <p className="d-flex justify-content-center align-items-center text-break matchCommander playerBox">{matchData.commander}</p>

            </Stack>
        </Col>
    );
};

