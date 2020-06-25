import React from "react";
import {NavLink} from "react-router-dom";

export const Sidebar = () => {
    return(
        <nav className={"widget"}>
            <div>
                    <br/>
                    <ul className={"widget-list"}>
                        <li><NavLink to="/learning/introduction">Введение</NavLink></li>
                        <li><NavLink to="/learning/lessons">Уроки</NavLink></li>
                        <li><NavLink to="/learning/tests">Тесты</NavLink></li>
                    </ul>
            </div>
        </nav>
    )

}

export default Sidebar;