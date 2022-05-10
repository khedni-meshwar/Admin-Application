import React, {useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import fire from "./firebase-config";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth"
import Login from "./Login";

import './App.css'
import AllLocations from "./pages/AllLocations";
import AddLocation from "./pages/AddLocation";
import Layout from "./layout/Layout";
import Analytics from "./pages/Analytics";

const App = () => {
    const auth = getAuth(fire);
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // handle any errors related to email and password
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };

    const handleLogin = () => {
        clearErrors();
        signInWithEmailAndPassword(auth, email, password)
            .catch(err => {
                // eslint-disable-next-line default-case
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };


    const authListener = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser('');
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);


    return (
        <>
            {user ? (
                <Layout>
                    <Routes>
                        <Route index element={<Analytics/>}/>
                        <Route path="/locations" element={<AllLocations/>}/>
                        <Route path="/add-location" element={<AddLocation/>}/>
                    </Routes>
                </Layout>
            ) : (
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    emailError={emailError}
                    passwordError={passwordError}
                />
            )}

        </>
    );
};

export default App;