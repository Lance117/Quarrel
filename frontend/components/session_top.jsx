import React from "react";
import {NavLink} from 'react-router-dom';

const SessionTop = () => (
    <nav className="top-persistent">
       <NavLink to="/">slack</NavLink> 
       <ul>
           <li>
               <NavLink to="/signin">Sign In</NavLink>
           </li>
       </ul>
    </nav>
)

export default SessionTop;