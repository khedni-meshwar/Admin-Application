import React, {useEffect, useState} from "react";
import "./MainDash.css";
import Cards from "../cards/Cards";
import Table from "../table/Table";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import fire from "../../firebase-config";
import {RingLoader} from "react-spinners";

const MainDash = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState(0);
    const [tourists, setTourists] = useState(0);
    const [locals, setLocals] = useState(0);

    const db = getFirestore(fire);

    useEffect(async () => {
        const userRef = collection(db, "users", "");
        getDocs(userRef)
            .then((response) => {
                setUsers(response.size);
                console.log("the number of users is " + users);
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
                <Table/>
            </div>

        );
    }

}

export default MainDash;