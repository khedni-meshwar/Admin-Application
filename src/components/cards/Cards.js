import React from "react";
import "./Cards.css";
import {CardsData} from "../../data";
import AnalyticCard from "./AnalyticCard";
import "./AnalyticCard.css";


const Cards = (props) => {
    const Png = CardsData.png;

    return (
        <>
            <div className="Cards">
                <div className="parentContainer">
                    <div className="CompactCard"
                         style={{background: CardsData.color.backGround, boxShadow: CardsData.color.boxShadow}}>
                        <div className="radialBar">
                            <span>{props.userNb}</span>
                            <span>Users</span>
                        </div>
                        <div className="detail">
                            <Png/>
                            <span style={{fontSize: "15px"}}>Last 24 hours</span>
                        </div>
                    </div>
                </div>
                <div className="parentContainer">
                    <AnalyticCard
                        title="Tourists"
                        color={CardsData.color}
                        barValue={(props.touristNb / props.userNb) * 100}
                        value={props.touristNb}
                        png={CardsData.png}/>
                </div>
                <div className="parentContainer">
                    <AnalyticCard
                        title="Residents"
                        color={CardsData.color}
                        barValue={(props.localNb / props.userNb) * 100}
                        value={props.localNb}
                        png={CardsData.png}/>
                </div>
            </div>
        </>
    );
}

export default Cards;