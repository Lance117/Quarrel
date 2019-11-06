import React from "react";
import {NavLink} from 'react-router-dom';

const Home = () => (
    <div>
        <header className="home-nav" role="banner">
            <div className="slacklogo">
                <NavLink to="/">slack</NavLink>
            </div>
            <ul className="home-navlist">
                <li className="home-nav-item">
                    <NavLink to="/signin">Sign in</NavLink>
                </li>
                <li className="home-nav-item">
                    <NavLink to="/signup">GET STARTED</NavLink>
                </li>
            </ul>
        </header>
        <main role="main">
            <section>

            </section>
            <footer>
                
            </footer>
        </main>
    </div>
)

export default Home;