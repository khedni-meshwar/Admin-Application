import "./Layout.css"
import TopNav from "../components/topnav/TopNav";

function Layout(props) {
    return <div>
        <TopNav/>
        <main className="main">{props.children}</main>
    </div>

}

export default Layout;