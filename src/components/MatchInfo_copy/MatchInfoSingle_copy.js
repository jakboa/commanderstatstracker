import React from "react";

import "./MatchInfoBox_copy.css";

import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';

import matchFirstPlacePicture from '../../utils/matchFirstPlacePicture.png'
import matchSecondPlacePicture from '../../utils/matchSecondPlacePicture.png'
import matchThirdPlacePicture from '../../utils/matchThirdPlacePicture.png'
import matchFourthPlacePicture from '../../utils/matchFourthPlacePicture.png'


export default function MatchInfoSingle( { matchData, show, index } ) {

    const pictures = [ matchFirstPlacePicture, matchSecondPlacePicture, matchThirdPlacePicture, matchFourthPlacePicture ]

    const placementID = `result-${matchData.placement}`;

    return (
            <Stack  direction="horizontal" className={`${show === matchData.nickName ? "getFocus" : show === matchData.commander ? "getFocus" :  ""} p-3 matchplayerStack align-items-stretch fw-semibold`} >
                <Image src={pictures[matchData.placement-1]} className="matchPic playerBox" />

                <p className={`${placementID} fs-1 d-flex justify-content-center align-items-center matchPlacement playerBox`}>{matchData.placement}</p>
            
                <p className={`${placementID} fs-4 border-end d-flex justify-content-center align-items-center matchNickname playerBox`}>{matchData.playerNick}</p>

                <p className={`${placementID} fs-5 d-flex justify-content-center align-items-center text-break matchCommander playerBox`}>{matchData.commander}</p>

            </Stack>
    );
};

