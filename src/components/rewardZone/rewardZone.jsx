import React, { Fragment, useEffect } from 'react';
import Back from "../common/back";
import './rewardZone.css';
import {WhatsappIcon,WhatsappShareButton} from 'react-share'
import { containerHeightCalcFn } from "../common/global";
import RewardBox from "../common/rewardBox";
import GCarousel from '../common/carousel';
import { getCustomerDetails } from '../common/getStoreData';
import { getData, postData } from '../../api/apiHelper';
import {
    ENGT_PROD_HOST_URI,
    REPT_PROD_HOST_URI,
    SERVICE_TYPE,
    ACTIVE_ENGAGEMENTS,
    PLAYER_SUMMARY,
} from '../../api/apiConstants';


export default function RewardZone(props) {
    // console.log('**', props);
    var customer=getCustomerDetails();
    
    var referralLink=`${customer?.SignUpUrl}?refcode=${customer?.ReferralCode}`;
    var referralMessage="Shopping is more exciting now, Play Games and Win Exciting Rewards, Come Join the fun at -"+referralLink;

    function pointsOpenFn() {
        props.history.push('/transactionhistory');
    }
    function customerSavingsOpenFn() {
        props.history.push('/customersavings');
    }
    function rewardOpenFn() {
        props.history.push('/userrewards');
    }
    function tournamentsOpenFn(){
        props.history.push('/tournaments');
    }

    function gameDetailFn(selectedEngagementData) {
        props.rewardZoneActionHandler.pushSelectedEngagement(selectedEngagementData);
        props.history.push({ pathname: "/gamedetail" });
    }
    function leaderBoardFn(selectedEngagementData) {
        props.rewardZoneActionHandler.pushSelectedEngagement(selectedEngagementData);
        props.history.push('/leaderboard');
    }
    function topCustomerSavingsOpenFn(selectedEngagementData){
        props.rewardZoneActionHandler.pushSelectedEngagement(selectedEngagementData);
        props.history.push('/topcustomersavings');
    }
    
    function statusFn() {
        props.history.push('/status');
    }
    const carouselItemClick = (data) => {
        props.rewardZoneActionHandler.pushSelectedEngagement(props.engagements[data]);
        props.history.push({ pathname: "/gamedetail" });
    }

    const handleLoader=(bool)=>{
        props.routeActionHandler.dispatchLoaderData(bool);
    }

    useEffect(() => {
        let data={
            CustomerID:customer.CustomerID
        }
        if(!props.playerSummary){
            handleLoader(true);
            postData(`${REPT_PROD_HOST_URI}${PLAYER_SUMMARY}`,data, SERVICE_TYPE.REPT)
                .then(summary => {
                    props.rewardZoneActionHandler?.setPlayerSummary(summary);
                    handleLoader(false);
               })
        }

        if(!Array.isArray(props.engagements)){
            handleLoader(true);
            getData(`${ENGT_PROD_HOST_URI}${ACTIVE_ENGAGEMENTS}`, SERVICE_TYPE.ENGT)
                .then(engagementswithGames => {
                    props.rewardZoneActionHandler.setEngagements(engagementswithGames);
                    handleLoader(false);
                })
        }
        props.rewardZoneActionHandler.setEngagementsRuleAmounts([]);
    }, []);

    return (
        <Fragment>
            <Back height="226"
                fromRewardZone={true}
                parentProps={props}
                rewardOpenFn={rewardOpenFn}
                pointsOpenFn={pointsOpenFn}
                tournamentsOpenFn={tournamentsOpenFn}
                customerSavingsOpenFn={customerSavingsOpenFn}
            />
            <div id="reward-zone-container" className="" style={{ height: containerHeightCalcFn(190), overflowY: 'auto', paddingBottom: '27px' }}>
                {/* <div id="reward-zone-status-container">
                    <div className="reward-zone-status-logo">
                        <img src={master_src} alt='' />
                    </div>
                    <div className="reward-zone-status-divider"></div>
                    <div className="reward-zone-status-content" onClick={() => statusFn()}>
                        <div>
                            <h5 className="mb-1">Master</h5>
                        </div>
                        <ProgressBar percentage="48" />
                        <div>
                            <span className="reward-zone-status-msg">Perform 2 more task to reach Status B</span>
                        </div>
                        <div>
                            <img className="reward-zone-status-benefit-icon" src={benefits_src} alt='' />
                            <div className="reward-zone-status-benefit-msg">Benifit of status update</div>
                        </div>
                    </div>
                </div> */}
                <div className="reward-zone-invite-container">
                    <div className="reward-zone-invite-logo">
                        <WhatsappShareButton url={referralMessage}>
                            <WhatsappIcon size={48} round={true} />
                        </WhatsappShareButton>
                    </div>
                    <div className="reward-zone-invite-content">
                        <div>
                            <h5 className="mb-0">Invite your Friends and Earn</h5>
                        </div>
                        <div>
                            <span className="reward-zone-status-msg">Invite your Friends and Earn</span>
                        </div>
                    </div>
                </div>
                <GCarousel data={props.engagements}
                    fromGameDetail={false}
                    centerMode={true}
                    centerSlidePercentage={80}
                    carouselItemClick={carouselItemClick} >
                </GCarousel>
                <div className="reward-zone-handpicked-header text-bold">Handpick Challenges for you to get Lucky!!</div>
                {props.engagements && props.engagements.length > 0 &&
                    <div className="reward-zone-handpicked-items">
                        {props.engagements.map((obj) => (
                            <RewardBox 
                                engagement={obj} 
                                engagementPlayersAndAmounts={props?.engagementPlayersAndAmounts}
                                props={props}
                                gameDetailFn={gameDetailFn} 
                                customerSavings={topCustomerSavingsOpenFn} 
                                leaderBoardFn={leaderBoardFn} 
                            />
                        ))}
                    </div>
                }
            </div>
        </Fragment>
    )
}
