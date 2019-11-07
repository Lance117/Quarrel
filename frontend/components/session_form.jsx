import React from "react";
import ReactDOM from "react-dom";
import { NavLink, Redirect, Switch, Route } from 'react-router-dom'
import SessionTop from './session_top'

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            loggedIn: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        this.setState({ loggedIn: true });
    }

    update(k) {
        return e => {
            this.setState({ [k]: e.target.value })
        };
    }

    isLoggedIn() {
        return this.state.loggedIn;
    }

    formTypeMsgs() {
        if (this.props.formType === 'login') {
            return ['Sign in', 'New to Slack? ', 'Create an account.', 'signup', ' to'];
        }
        return ['Sign up', 'Already have an account? ', 'Sign in here.', 'signin', ' for'];
    }

    render() {
        if (this.isLoggedIn()) {
            return <Redirect to="/workspace" />
        }
        return (
            <div className="formpage">
                <SessionTop />
                <div className="page-contents">
                    <div className="content-card">
                        <h1>{this.formTypeMsgs()[0] + this.formTypeMsgs()[4]} Team Rocket</h1>
                        <p className="med-bottom-margin">dark-mode-slack.com/team-rocket</p>
                        <form onSubmit={this.handleSubmit} className="signin-form">
                            {this.props.formType === 'login' ? (
                                <p>Enter your <strong>email address</strong> and <strong>password</strong>.</p>
                            ): (
                                <p>Enter your email address, a display name, and password to get started.</p>
                            )}

                            <p className="no_bottom_margin">
                                <input type="email" placeholder="you@example.com" size="40" onChange={this.update('email')}/>
                            </p>
                            {this.props.formType === 'signup' ? (
                                <p>
                                    <input type="text" placeholder='display name' size="40"/>
                                </p>
                            ) : (null)
                            }
                            <p className="small_bottom_margin">
                                <input type="password" placeholder="password" size="40" onChange={this.update('password')}/>
                            </p>
                            <p>
                                <button type="submit">
                                    <span>{this.formTypeMsgs()[0]}</span>
                                </button>
                            </p>
                        </form>
                    </div>
                    <div>
                        <p>
                            {this.formTypeMsgs()[1]} <NavLink to={`/${this.formTypeMsgs()[3]}`} className="bold">{this.formTypeMsgs()[2]}</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default SessionForm;