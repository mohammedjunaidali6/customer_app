import React, { Fragment, useState, useEffect } from 'react';
import reward1_src from '../../assets/img/gameDetails/reward1.svg';
import reward2_src from '../../assets/img/gameDetails/reward2.svg';
import reward3_src from '../../assets/img/gameDetails/reward3.svg';
import reward4_src from '../../assets/img/gameDetails/reward4.svg';
import dots_progress from '../../assets/img/dots-progress.gif';
import store from "../../store/store";
import { getData, postData } from '../../api/apiHelper';
import {
    ENGT_PROD_HOST_URI,
    SERVICE_TYPE,
    ENGAGEMENT_DETAILS_FOR_PLAYER,
    ENGAGEMENT_SUMMARY,
} from '../../api/apiConstants';



export default function GameDetailRewards(props) {
    const [loadingRewards, setLoadingRewards] = useState();
    const [loadingSummary, setLoadingSummary] = useState(true);
    const [engagementSummary,setEngagementSummary]=useState({});
    const rewardZoneReducerData = store.getState().RewardZoneReducer;
    const [allEngagements, setAllEngagements] = useState(rewardZoneReducerData.engagements);
    const [selectedEngagement, setSelectedEngagement] = useState(rewardZoneReducerData.selectedEngagement);
    const [engagementDetails, setEngagementDetails] = useState({});
    const carouselItemClick = (data) => {
        props.rewardZoneActionHandler.pushSelectedEngagement(allEngagements[data]);
        setSelectedEngagement(allEngagements[data]);
    }

    useEffect(() => {
        setLoadingRewards(true)
        
        var requestData = {
            EngagementID: selectedEngagement.EngagementID,
            IsTournament:selectedEngagement.IsTournament,
            JourneyID: selectedEngagement.JourneyID,
            // CustomerID:customer.CustomerID,
            // CustomerFullName:customer.FirstName+' '+customer.LastName
        }
        postData(`${ENGT_PROD_HOST_URI}${ENGAGEMENT_DETAILS_FOR_PLAYER}`, requestData, SERVICE_TYPE.ENGT)
            .then(engagementDetails => {
                setEngagementDetails(engagementDetails);
                setLoadingRewards(false)
            })
        
    }, [selectedEngagement])
    useEffect(()=>{
        setLoadingSummary(true)
        getData(`${ENGT_PROD_HOST_URI}${ENGAGEMENT_SUMMARY}${selectedEngagement?.EngagementID}`,SERVICE_TYPE.ENGT)
        .then(res=>{
                setEngagementSummary(res);
            })
        setLoadingSummary(false)
    },[])
    console.log('****',props);
    const rewards=props.rewards;
    const isTourn=props.engagement?.IsTournament;
    // const tenantId = props.engagement?.tenantId;
    // console.log('***',props.rewards)
    const getWinPositionString = (position) => {
        switch (position) {
            case 1:
                return '1st Prize';
            case 2:
                return '2nd Prize';
            case 3:
                return '3rd Prize';
            default:
                return position+'th Prize';
        }
    }
    const getDiscountString=(type,value)=>{
        // value=value||'';
        if(value){
            switch(type){
                case 'Percentage':
                return value+'%';
                case 'Fixed':
                return "FLAT "+value+" Off";
                case 'Points':
                return value+" Points";
                default:
                return value;
            }
        }
    }
    const getOfferStr=(rewardType,discountType,discountValue)=>{
        switch(rewardType){
            case 'Points':
                return 'Points';
            case 'Coupons':
                    return 'Flat Discount';
            default:
                return '';
        }
    }

    return (
        <Fragment>
            
            {loadingRewards ? (
            <img src={dots_progress} alt="Loading..." height='20%' width='40%' style={{margin:'20% 30%'}}/>):(
            <div>
            {rewards && rewards.length > 0 ? (
                <div className="gamedetail-rewards-items">
                    <Fragment>  
                        <div className="rewards-header">Rewards</div>
                        {rewards.map((obj, i) => (
                            <div className={`rewards-item rewards-item-${i + 1}`} key={`reward-item${obj.RewardMasterID}`}>
                                {isTourn&& <img className="reward-place" alt="" src={obj.WinPosition === 1 ? reward1_src : (obj.WinPosition === 2 ? reward2_src : (obj.WinPosition === 3 ? reward3_src : reward4_src))} /> }
                                <div className="w-30 rewards-item-left" >
                                    <div className="rewards-discount">
                                        <div className="rewards-discount-header">{obj.FormattedDiscountValue? getDiscountString(obj.DiscountType,obj.FormattedDiscountValue) :getDiscountString(obj.DiscountType,obj.DiscountValue)}</div>
                                        <div className="rewards-discount-desc">{getOfferStr(obj.RewardType,obj.DiscountType,obj.DiscountValue)}</div>
                                        <div className="curve-div reward-item-box-top reward-item-box-right"></div>
                                        <div className="curve-div reward-item-box-bottom reward-item-box-right"></div>
                                    </div>
                                </div>
                                <div className="w-70 rewards-item-right" >
                                    <div className="rewards-discount-detail">
                                        {isTourn && <div className="rewards-discount-detail-name"> {getWinPositionString(obj.WinPosition)}</div>}
                                        <div className="rewards-discount-detail-desc">{obj.DisplayName}</div>
                                        {isTourn && <div className="rewards-discount-detail-name mt-1">No. of Awards : {obj.NumberOfWinners ? obj.NumberOfWinners : ''}</div>}
                                        <div className="rewards-discount-detail-TC">T&C apply</div>
                                        <div className="curve-div reward-item-box-top reward-item-box-left"></div>
                                        <div className="curve-div reward-item-box-bottom reward-item-box-left"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Fragment>
                </div>
            ) : null}
            </div>
            )}
            
        </Fragment>
    )
}
