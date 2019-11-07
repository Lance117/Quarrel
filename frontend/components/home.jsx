import React from "react";
import {NavLink} from 'react-router-dom';

const Home = () => (
    <div>
        <header className="home-nav" role="banner">
            <div className="slacklogo">
                <NavLink to="/"><img src="https://assets.brandfolder.com/pljt3c-dcwb20-27ztzl/view@2x.png?v=1547850604"/></NavLink>
            </div>
            <ul className="home-navlist">
                <li className="home-nav-item">
                    <NavLink to="/signin">Sign in</NavLink>
                </li>
                <li className="home-nav-item">
                    <NavLink to="/signup">Sign up</NavLink>
                </li>
            </ul>
        </header>
        <main className="home-main">
            <section>
            </section>
            <footer>
                
            </footer>
        </main>
    </div>
)

export default Home;