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
        <Col className="fs-4 text-center">
            <Stack direction="horizontal" className="p-3" >
                <Image src={pictures[matchData.placement-1]} className="matchPic playerBox" />
            
                <p className="matchNickname playerBox ">{matchData.nickName}</p>

                <p className="matchCommander playerBox">{matchData.commander}</p>
            
                <p className="matchPlacement playerBox">{matchData.placement}</p>
            </Stack>
        </Col>
    );
};

