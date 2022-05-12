import React from "react";
import "./LocationItem.css"
import Card from "../ui/Card";

const LocationItem = (props) => {

    console.log(props.address)

    return (
        <li className="item">
            <Card>
                <div className="image">
                    <img src={props.mainPhoto} alt={props.name}/>
                </div>
                <div className="content">
                    <h3>{props.name}</h3>
                    <p><h4>[{props.address.latitude} {props.address.longitude}]</h4></p>
                    <p>{props.description}</p>
                    <p>{props.tags}</p>
                    {/*<DeleteIcon />*/}
                </div>
            </Card>
        </li>
    )
}

export default LocationItem;