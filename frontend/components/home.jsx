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
                    </div>
                    <ul className="home-navlist">
                        <li className="home-nav-item">
                            <NavLink to="/signin">Sign in</NavLink>
                        </li>
                        <li className="home-nav-item">
                            <NavLink to="/signup">Sign up</NavLink>
                        </li>
                        <li className="home-nav-item">
                            <form onSubmit={this.handleSubmit}>
                                <button className="guest-btn">guest login</button>
                            </form>
                        </li>
                    </ul>
                </header>
                <main className="home-main">
                    <section>
                        <div>

                        </div>
                    </section>
                    <footer>

                    </footer>
                </main>
            </div>
        )
    }
}

export default Home;