import React, {useEffect, useState} from "react";
import "./MainDash.css";
import Cards from "../cards/Cards";
import Table from "../table/Table";
import {collection, getDocs, getFirestore, query, where, doc} from "firebase/firestore";
import fire from "../../firebase-config";
import {RingLoader} from "react-spinners";

const MainDash = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState(0);
    const [tourists, setTourists] = useState(0);
    const [locals, setLocals] = useState(0);
    const [country, setCountryData] = useState([]);

    const db = getFirestore(fire);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const userRef = collection(db, "users", "");
        getDocs(userRef)
            .then((response) => {
                const countryData = {};
                setUsers(response.size);
                response.forEach((doc) => {
                    const countryCode = doc.data()['countryCode'];
                    if (countryData[countryCode] === undefined)
                        countryData[countryCode] = 1;
                    else
                        countryData[countryCode] += 1;
                });
                const data = []
                for (const [ key, value ] of Object.entries(countryData)) {
                    data.push({
                        "country": key,
                        "freq": value
                    });
                }
                setCountryData(data);
            });
        const touristRef = query(userRef, where('type', '==', 'tourist'));
        getDocs(touristRef)
            .then((response) => {
                setTourists(response.size);
                console.log("the number of tourists is " + tourists);
            });
        const localRef = query(userRef, where('type', '==', 'resident'));
        getDocs(localRef)
            .then((response) => {
                setLocals(response.size);
                console.log("the number of locals is " + locals);
                setIsLoading(false);
            })

    }, []);

    if (isLoading) {
        return (
            <section style={{marginLeft: "50%", marginTop: "10%"}}>
                <RingLoader color="#04555c" size={150}/>
            </section>
        )
    } else {
        return (
            <div className="main-dash">
                <h1>Application Analytics</h1>
                <Cards touristNb={tourists} localNb={locals} userNb={users}/>
                <Table countryData={country}/>
            </div>

        );
    }

}

export default MainDash;