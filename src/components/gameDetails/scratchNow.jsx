import React, { useState,Fragment } from 'react';

import ProgressBar from "../common/progressBar";
import iFrame from 'react-iframe';
import { AiOutlineClose } from "react-icons/ai";
import group1 from '../../assets/img/gameDetails/Group1.svg';
import group2 from '../../assets/img/gameDetails/Group2.svg';
import group3 from '../../assets/img/gameDetails/Group3.svg';
import Iframe from 'react-iframe';

const tempArray = [
    {
        id: 1, 
        lblPrize: '1st Prize', 
        lblDiscount: '50% Flat off iPhone',
        prize: '50%',
        discount: 'FLAT DISCOUNT'
    },
    {
        id: 2, 
        lblPrize: '2nd Prize', 
        lblDiscount: '1000 Points',
        prize: '1000',
        discount: 'POINTS'
    },
    {
        id: 3, 
        lblPrize: '3rd Prize', 
        lblDiscount: 'Rs. 300 off',
        prize: '$300',
        discount: 'FLAT DISCOUNT'
    },
    {
        id: 4, 
        lblPrize: '4th Prize', 
        lblDiscount: 'Rs. 100 off',
        prize: '$100',
        discount: 'FLAT DISCOUNT'
    }
];

export default function GameDetailScratchNow(props) {

    const [iFrameClick, setIFrameClick] = useState(false);

    return (
        <div className="gamedetail-scratchnow-items">
            <Fragment>
                {props.selectedGameDetail && props.selectedGameDetail.campaignName ? 
                    <div className="scratchnow-big-header">{props.selectedGameDetail.campaignName}</div> : 
                null}
                <div className="scratchnow-small-header">Scrach more to win </div>
                <div className="scratchnow-item-container"> 
                    {props.selectedGameDetail && props.selectedGameDetail.journeys &&  props.selectedGameDetail.journeys.length > 0 ? (
                        <div className={props.selectedGameDetail.journeys.length < 3 ? 'scratchnow-items-center' : ''}>
                            {props.selectedGameDetail.journeys.map((jObj,idx) => (
                                <div className="scratchnow-box float-left clearfix" key={`scratchnow-box-${idx}`}>
                                    <div className="scratch-box-logo">
                                        <img src={(idx + 1) === 1 ? group1 : ((idx + 1) === 2 ? group2 : group3)} />
                                    </div>
                                    <div className="scratchnow-box-header">
                                        <div className="txt-clamp-1">{jObj.name}</div>
                                    </div>
                                    <div className="scratchnow-box-desc">
                                        <div className="txt-clamp-1">{jObj.status}</div>
                                    </div>
                                </div> 
                            ))}
                        </div>
                    ):null}
                </div>
                <div className="w-100 float-left clearfix ">
                    <div className="scratchnow-complete-the-journey">Complete the journey to participate</div>
                    <div className="w-100">
                        <div className="w-90 mt-1 float-left progress-bar-outer">
                            <ProgressBar percentage="90" />
                        </div>
                        <div className="w-10 float-left lbl-percentage">90%</div>
                    </div>
                </div>
                <div id="btn-scratch-now-container" className="mt-3">
                    <button type="button" id="btn-scratch-now" onClick={() => setIFrameClick(true)}>
                        <span className="button-text">PLAY NOW</span>
                    </button>
                </div>
                {iFrameClick ? (
                    <div id="g-d-iFrame-sec">
                        <AiOutlineClose id="g-d-iFrame-close" className="close-box m-1" title="Close Game" onClick={() => setIFrameClick(false)} />
                        <iframe id="g-d-iFrame" src={props.selectedGameDetail.gameUrl} height='100%' width='100%' ></iframe>
                    </div>
                ) : null}
            </Fragment>
        </div>
    )
}
