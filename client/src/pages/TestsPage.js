import React from "react";
import Sidebar from "../components/Sidebar";
import Test from "../components/Test"

export  const  TestsPage = () =>{
return (
    <div>
    <table width={"100%"}>
        <thead/>
        <tbody>
        <tr>
            <td rowSpan={2} width={"25%"}>
              <Sidebar/>
            </td>
            <td className={"test"} width={"80%"}>
              <Test/>
            </td>
        </tr>
        </tbody>
        <tfoot/>
    </table>
    </div>
)};
