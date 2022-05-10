import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import {
    BrowserRouter as Router,
} from "react-router-dom";

function Greeting(){
    return (
        <div>
            <App/>
        </div>
    );
}
// ReactDom.render(<Greeting/>, document.getElementById('root')
ReactDom.render(
    <React.StrictMode>
        <Router>
            <Greeting/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);