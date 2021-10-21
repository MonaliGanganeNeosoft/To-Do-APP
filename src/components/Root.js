import React from "react";
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';


function Root(){
    return (
        <>
            You need to &nbsp;
            <Link to="/register">Register</Link>&nbsp;
            to Continue.&nbsp;
            <Link to="/login">Login</Link>&nbsp;
            or&nbsp;
            to Continue.
        </>
    )
}
export default Root;