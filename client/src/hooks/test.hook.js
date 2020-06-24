export function getTest(name) {
    const test = require("../tests/${name}.json");
    console.log(test);
    return test;
}

//import {getTest} from "../hooks/test.hook";
//getTest('first');