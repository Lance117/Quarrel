import React from "react";
import {NavLink} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.guest = {
            email: "karatekid@gmail.com",
            password: "karatekid"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.guest);
        this.props.processForm(user);
    }

    render() {
        return (
            <div>
                <header className="home-nav" role="banner">
                    <div className="slacklogo">
                        <NavLink to="/"><img src={window.whiteLogo} /></NavLink>
                        <span className="app_name">quarrel</span>
                    </div>
                    <ul className="home-navlist">
                        <li className="home-nav-item home-hover">
                            <NavLink to="/signin">Sign in</NavLink>
                        </li>
                        <li className="home-nav-item home-hover">
                            <NavLink to="/signup">Sign up</NavLink>
                        </li>
                        <li className="home-nav-item home-hover">
                            <form onSubmit={this.handleSubmit}>
                                <button className="guest-btn">Guest login</button>
                            </form>
                        </li>
                    </ul>
                </header>
                <main className="home-main">
                    <section className="teamwork-section">
                        <div className="section-content">
                            <div>
                                <h2 className="section-headline">Argue with friends and strangers around the world</h2>
                                <p className="section-feature">
                                    Want to discuss cool topics like sports, boba, or K-pop? Make a channel about it
                                    and tell people what you think!
                                </p>
                            </div>
                            <img src="https://i.imgur.com/oZP2biZ.png"/>
                        </div>
                    </section>
                </main>
                <footer className="home-footer">
                    <ul className="home-navlist">
                        <li className="footer-item">
                            <a href="https://www.linkedin.com/in/lanceawong/" target="_blank">
                                <img src="https://image.flaticon.com/icons/svg/61/61109.svg" style={{width: "30px", height: "30px"}}></img>
                            </a> 
                        </li>
                        <li className="footer-item">
                            <a href="https://github.com/LanceSanity" target="_blank">
                                <img src="https://image.flaticon.com/icons/svg/25/25657.svg" style={{width: "30px", height: "30px"}}></img>
                            </a> 
                        </li>
                    </ul>
                </footer>
            </div>
        )
    }
}

export default Home;