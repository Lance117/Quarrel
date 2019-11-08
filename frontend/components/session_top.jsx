import React from "react";
import {NavLink} from 'react-router-dom';

const SessionTop = () => (
    <nav className="top-persistent">
        <NavLink to="/" className="formlogo"></NavLink> 
       <ul className="form-navlist">
           <li className="sign-in">
               <NavLink to="/signin" className="signin-btn">Sign in</NavLink>
           </li>
       </ul>
    </nav>
)

export default SessionTop;