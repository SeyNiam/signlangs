import React from "react";

class StartLang extends React.Component{
    render(){
        return(
            <div className={"topmenu"}>
                <p className={"submenu-link"}>Язык: Русский <a href="/" id={"arrow"} className={"submenu-link"}>
                    <span className="a">▼</span>
                    <span className="b">▲</span>
                </a></p>
                <ul className={"submenu"}>
                    <li><a href="/">Русский</a></li>
                    <li><a href="/">Английский</a></li>
                </ul>
            </div>
        );
    }
}

export default StartLang;
