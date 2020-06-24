import React from "react";
import Login from "./Login";
import Register from "./Register";

class Forms extends React.Component{
    render(){
        return(
            <div className={"forms"}>
                <Login/>
                <br/>
                <Register/>
            </div>
        );
    }
}

export default Forms;