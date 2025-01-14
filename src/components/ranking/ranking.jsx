import React, { Fragment } from 'react';
import Back from "../common/back";
import { containerHeightCalcFn } from "../common/global";
import BackBanner from "../common/backBanner";
import RankingBox from "../common/rankingBox";
import './ranking.css';

const tempArray = [
    { id: 1, inVal: 14, ofVal: 1247, offerText: 'Flat 20% Off On Order of Rs.899 and Above', winnersCount: 241, expireMessage: 'Expire in 2 Days', gameBanner: 'http://185.151.51.83:8081/ga/corona-hits.png' },
    { id: 2, inVal: 241, ofVal: 2851, offerText: 'Flat 10% Off On Order of Rs.699 and Above', winnersCount: 24, expireMessage: 'Expire in 4 Days', gameBanner: 'http://185.151.51.83:8081/ga/stick-hero.png' },
    { id: 3, inVal: 47, ofVal: 1784, offerText: 'Flat 40% Off On Order of Rs.1299 and Above', winnersCount: 89, expireMessage: 'Expire in 6 Days', gameBanner: 'http://185.151.51.83:8081/ga/block.png' },
    { id: 4, inVal: 87, ofVal: 547, offerText: 'Flat 24% Off On Order of Rs.999 and Above', winnersCount: 174, expireMessage: 'Expire in 1 Day', gameBanner: 'http://185.151.51.83:8081/ga/tic-tac-toe.png' }
];
export default function Ranking(props) {

    return (
        <Fragment>
            <Back parentProps={props} fromRanking={true} />
            <BackBanner fromRanking={true} />
            <div id="ranking-container" className="" style={{ height: containerHeightCalcFn(228), overflowY: 'auto' }} >
                <h5 className="text-bold pl-2" style={{ margin: "14px 20px 0 20px" }}>Ranking in all games</h5>
                {tempArray && tempArray.length > 0 ? (
                    <div style={{ margin: "0 20px" }}>
                        {tempArray.map((obj) => (
                            <RankingBox dataObj={obj} key={obj.id} style={{ margin: "14px 20px" }} />
                        ))}
                    </div>
                ) : null}
            </div>
        </Fragment>
    )
}
