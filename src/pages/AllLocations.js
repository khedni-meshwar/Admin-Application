import React, {useEffect, useState} from "react";
import LocationList from "../layout/locations/LocationList";
import {collection, getFirestore, getDocs} from "firebase/firestore";
import fire from "../firebase-config";
import {RingLoader} from "react-spinners";


const AllLocations = () => {

    const [loadedLocations, setLoadedLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const db = getFirestore(fire);

    useEffect(async () => {
        getDocs(collection(db, "locations", ""))
            .then((response) => {
                const locations = []
                response.forEach(doc => {
                        const data = doc.data();
                        locations.push(data);
                    }
                )
                setLoadedLocations(locations);
                setIsLoading(false);
                console.log(loadedLocations);
            });
    }, []);

    if (isLoading) {
        return (
            <section style={{marginLeft: "50%", marginTop: "40%"}}>
                <RingLoader color="#04555c" size={200}/>
            </section>
        )
    }

    return (
        <div>
            <section>
                <h1>All Locations</h1>
                <LocationList locations={loadedLocations}/>
            </section>
        </div>
    );
};

export default AllLocations;