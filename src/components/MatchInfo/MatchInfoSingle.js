import React from "react";


import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import matchFirstPlacePicture from '../../utils/matchFirstPlacePicture.png'
import matchSecondPlacePicture from '../../utils/matchSecondPlacePicture.png'
import matchThirdPlacePicture from '../../utils/matchThirdPlacePicture.png'
import matchFourthPlacePicture from '../../utils/matchFourthPlacePicture.png'


export default function MatchInfoSingle( { matchData } ) {

    const pictures = [matchFirstPlacePicture,matchSecondPlacePicture,matchThirdPlacePicture,matchFourthPlacePicture]

    return (
        <Col>
            <Image src={pictures[matchData.placement-1]} thumbnail /> {matchData.nickName} {matchData.commander} {matchData.placement}
        </Col>
    );
};

