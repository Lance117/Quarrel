import React from "react";
import {NavLink} from 'react-router-dom';

function SessionTop(props) {
    const guest = {
        email: "karatekid@gmail.com",
        password: "karatekid"
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, guest);
        props.login(user);
    }

    return (
        <nav className="top-persistent">
            <NavLink to="/" className="formlogo"></NavLink> 
        <ul className="home-navlist">
            <li className="home-nav-item home-hover">
                <form onSubmit={handleSubmit}>
                    <button className="guest-btn">Guest login</button>
                </form>
            </li>
            <li className="home-nav-item home-hover sign-in">
                <NavLink to="/signin" className="signin-btn">Sign in</NavLink>
            </li>
        </ul>
        </nav>
    )
}

export default SessionTop;