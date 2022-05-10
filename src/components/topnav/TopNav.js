import {useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import fire from "../../firebase-config";
import './topnav.css'

const TopNav = () => {
    const auth = getAuth(fire);

    const handleLogout = () => {
        signOut(auth);
    };

    let navigate = useNavigate();

    return (
            <nav>
                <h2>Khedni Meshwar</h2>
                <button onClick={() => navigate("../", {replace: true})}>Home</button>
                <button onClick={() => navigate("../locations", {replace: true})}>Locations</button>
                <button onClick={() => navigate("../add-location", {replace: true})}>Add Location</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
    )
}

export default TopNav