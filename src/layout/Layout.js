import "./Layout.css"
import TopNav from "../components/topnav/TopNav";

function Layout(props) {
    return <div>
        <TopNav/>
        {props.children}
    </div>

}

export default Layout;