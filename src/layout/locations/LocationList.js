import React from "react";
import LocationItem from "./LocationItem";
import "./LocationList.css"

const LocationList = (props) => {
    return (<ul className="list">
            {props.locations.map((location) => (
                <LocationItem
                    key={location.id}
                    id={location.id}
                    mainPhoto={location.mainPhoto}
                    name={location.name}
                    address={location.geolocation}
                    description={location.description}
                />
            ))}
        </ul>
    );
}

export default LocationList;