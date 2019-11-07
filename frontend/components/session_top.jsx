import React from "react";
import {NavLink} from 'react-router-dom';

const SessionTop = () => (
    <nav className="top-persistent">
        <NavLink to="/" className="formlogo"><img src="https://assets.brandfolder.com/pl546j-7le8zk-btwjnu/view@2x.png?v=1547165150" /></NavLink> 
       <ul className="form-navlist">
           <li className="sign-in">
               <NavLink to="/signin" className="form-nav-item">Sign In</NavLink>
           </li>
       </ul>
    </nav>
)

export default SessionTop;