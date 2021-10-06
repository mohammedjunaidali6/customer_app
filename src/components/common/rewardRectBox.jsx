import React, { useEffect, useState } from 'react';
import rupee_src from '../../assets/img/rewardZone/amountwon_home_small.svg';
import trophy_src from '../../assets/img/rewardZone/trophy_home.svg';
import tourn_src from '../../assets/img/TournamentLabel.png';
import coin_src from '../../assets/img/coin-btn.png';
import '../../assets/css/rewardBox.css';
import ProgressBar from "../common/progressBar";
import { getData, postData } from '../../api/apiHelper';
import { getCustomerDetails } from './getStoreData';
import {  
    SERVICE_TYPE,
    EVNT_PROD_HOST_URI, 
    ENGT_PROD_HOST_URI,
    ENGAGEMENT_SUMMARY, 
    PURCHASE_RULE_AMOUNT, 
} from '../../api/apiConstants';


export default function RewardRectBox(props) {
    // console.log('***',props);
    const engagement=props.engagement;
    const game=engagement.Game;
    const [perc,setPerc]=useState(0);
    const [summary,setSummary]=useState();
    const [amountToBePurchased,setAmountToBePerchased]=useState(engagement?.PurchaseValue||0);
    const customerData=getCustomerDetails();

    const onPlayNow =()=>{
        props.gameDetailFn(engagement)
    }


    useEffect(()=>{
        let obj={
            CustomerID:customerData?.CustomerID,
            LastNumberOfDays:engagement?.LastNumberOfDays,
            PurchaseRuleValue:engagement?.PurchaseValue
        }
        postData(`${EVNT_PROD_HOST_URI}${PURCHASE_RULE_AMOUNT}`,obj,SERVICE_TYPE.EVNT)
        .then(res=>{
            if(res){
                setAmountToBePerchased(Math.round(res.FormattedToBePurchasedToRuleAmount));
                let percentage=engagement.PurchaseValue>res?(res.ToBePurchasedToRuleAmount/engagement?.PurchaseValue)*100:100;
                setPerc(percentage);
            }
        })
        getData(`${ENGT_PROD_HOST_URI}${ENGAGEMENT_SUMMARY}${engagement?.EngagementID}`,SERVICE_TYPE.ENGT)
        .then(res=>{
                setSummary(res);
            })
    },[])

    
  return (
    <div className="reward-rect-box">
      <div className='engagement-header-label'>
      <span className='eng-h-tourn'>{engagement?.IsTournament?<img src={tourn_src} width={80} height={16}/>:''}</span>
      {engagement.CostToPlay?
          <span className='eng-h-cost'>bCoins: {engagement.CostToPlay}&nbsp;
              <img src={coin_src} width={8} height={8}/>
          </span>
          :
          <span  className='eng-h-cost'>Free*</span>
      }
      </div>
      <div className="reward-mask-box">
          <img src={`${game?.RectangleImageUrl}`} alt="Mask" style={{ height: '100%' }} />
          <div className="curve-div reward-item-box-bottom reward-item-box-left"></div>
          <div className="curve-div reward-item-box-bottom reward-item-box-right"></div>
      </div>
      <div className="reward-item-box">
          <div className="curve-div reward-item-box-top reward-item-box-left"></div>
              <div className="curve-div reward-item-box-top reward-item-box-right"></div>
              <div className="w-100 reward-item-box-content mt-2">
                  <span className="text-rank-of">{engagement.DisplayName?.length>40?engagement.DisplayName?.substring(0,40)+'...':engagement.DisplayName}</span>
              </div>
              <div className="w-86 ml-2 mr-2">
                  <ProgressBar height={'7px'} percentage={perc} style={{width:'90%'}}/>
              </div>
              <div className="reward-item-box-progress-msg">
                  {amountToBePurchased>0&&
                      <span>Shop for {amountToBePurchased} to Play</span>
                  }
              </div>
              <div className="w-100 text-center">
                  <button
                      type="button" 
                      className='btn-reward-item-playnow enable-btn'
                      onClick={onPlayNow}
                    ><span className="button-text">EXPLORE</span>
                  </button>
              </div>
              <div className="w-100 dashed-line-div"></div>
              <div className="w-100 reward-item-box-content pt-2 pb-3">
                  <div className="w-50 float-left clearfix text-winners" style={{marginLeft:'4%'}} onClick={() => props.leaderBoardFn(engagement)}>
                      <div className="">
                          <img style={{ width: "12px", float: "left", marginRight: "8px",height:'10px' }} src={trophy_src} />
                      </div>
                      <div>
                          <div style={{ marginBottom: "2px", fontSize: "12px", color: "#3F4045" }}>
                            {summary?.CustomersCount||0}
                          </div>
                          <div style={{color: "#808A8F", fontSize: "10px"}}>Players</div>
                      </div>
                  </div>
                  <div className="w-50 float-left clearfix text-winners" style={{marginLeft:'80%',marginTop:'-3%'}}   onClick={() => props.customerSavings(engagement)}>
                      <div className="">
                          <img style={{ width: "12px", float: "left", marginRight: "8px" }} src={rupee_src} />
                      </div>
                      <div>
                          <div style={{ marginBottom: "2px", fontSize: "12px", color: "#3F4045" }}>
                            {summary?.FormattedAmountRedeemed||0}
                          </div>
                          <div style={{color: "#808A8F",fontSize: "10px"}}>Amount Won</div>
                      </div>
                  </div>
              </div>
      </div>
    </div>
  )
}