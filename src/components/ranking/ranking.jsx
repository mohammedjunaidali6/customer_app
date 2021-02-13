import React, { Fragment } from 'react';
import Back from "../common/back";
import BackBanner from "../common/backBanner";
import RankingBox from "../common/rankingBox";

const tempArray = [
    {id: 1, inVal: 14, ofVal: 1247, offerText: 'Flat 20% Off On Order of Rs.899 and Above', winnersCount: 241, expireMessage: 'Expaire in 2 Days'},
    {id: 2, inVal: 241, ofVal: 2851, offerText: 'Flat 10% Off On Order of Rs.699 and Above', winnersCount: 24, expireMessage: 'Expaire in 4 Days'},
    {id: 3, inVal: 47, ofVal: 1784, offerText: 'Flat 40% Off On Order of Rs.1299 and Above', winnersCount: 89, expireMessage: 'Expaire in 6 Days'},
    {id: 4, inVal: 87, ofVal: 547, offerText: 'Flat 24% Off On Order of Rs.999 and Above', winnersCount: 174, expireMessage: 'Expaire in 1 Day'}
];
export default function Ranking(props) {
    
    return (
        <div id="ranking-container" className="">
            <Back />
            <BackBanner />
            <h5 className="text-bold mt-2 ml-3 mb-0">Ranking in all games</h5>
            {tempArray && tempArray.length > 0 ? (
                <Fragment>
                    {tempArray.map((obj) => (
                        <RankingBox dataObj={obj} key={obj.id} />
                    ))}
                </Fragment>
            ): null}
        </div>
    )
}