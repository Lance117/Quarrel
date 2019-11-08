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
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    update(k) {
        return e => {
            this.setState({ [k]: e.target.value })
        };
    }

    formTypeMsgs() {
        if (this.props.formType === 'login') {
            return ['Sign in', 'New to Slack? ', 'Create an account.', 'signup', ' to'];
        }
        return ['Sign up', 'Already have an account? ', 'Sign in here.', 'signin', ' for'];
    }

    renderErrors() {
        if (this.props.errors.length > 0) {
            return (
                <div className="errors col">
                    {this.props.errors.map((error, i) => (
                        <p className="alert-error" key={`error-${i}`}>{error}</p>
                    ))}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="formpage">
                <SessionTop />
                <div className="page-contents">
                    {this.renderErrors()}
                    <div className="content-card span_3_of_5 col">
                        <h1>{this.formTypeMsgs()[0] + this.formTypeMsgs()[4]} team rocket</h1>
                        <p className="med-bottom-margin">dark-mode-slack.com/team-rocket</p>
                        <form onSubmit={this.handleSubmit} className="signin-form span_3_of_5 .col">
                            {this.props.formType === 'login' ? (
                                <p>Enter your <strong>email address</strong> and <strong>password</strong>.</p>
                            ): (
                                <p>Enter your email address, a display name, and password to get started.</p>
                            )}

                            <p className="no_bottom_margin">
                                <input className="session-input" type="email" placeholder="you@example.com" size="40" onChange={this.update('email')}/>
                            </p>
                            {this.props.formType === 'signup' ? (
                                <p>
                                    <input className="session-input" type="text" placeholder='display name' size="40" onChange={this.update('username')}/>
                                </p>
                            ) : (null)
                            }
                            <p className="small_bottom_margin">
                                <input className="session-input" type="password" placeholder="password" size="40" onChange={this.update('password')}/>
                            </p>
                            <p>
                                <button className="form-btn" type="submit">
                                    <span>{this.formTypeMsgs()[0]}</span>
                                </button>
                            </p>
                        </form>
                    </div>
                    <div className="bottom-content">
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