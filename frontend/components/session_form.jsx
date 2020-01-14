import React from "react";
import { NavLink, Redirect, Switch, Route } from 'react-router-dom'
import SessionTop from './session_top'

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            emailClass: "session-input",
            passwordClass: "session-input",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const formType = this.props.formType;
        if (formType === 'login' && this.state.email === '') {
            this.setState({emailClass: "session-input error"});
        } else if (formType === 'login' && this.state.password === '') {
            this.setState({passwordClass: "session-input error"});
        } else {
            const user = Object.assign({}, this.state);
            this.props.processForm(user);
        }
    }

    update(k) {
        return e => {
            this.setState({ [k]: e.target.value })
        };
    }

    formTypeMsgs() {
        if (this.props.formType === 'login') {
            return ['Sign in', 'New to Quarrel? ', 'Create an account.', 'signup', ' to'];
        }
        return ['Sign up', 'Already have an account? ', 'Sign in here.', 'signin', ' for'];
    }

    renderErrors() {
        if (this.props.errors.length > 0) {
            return (
                <div className="span-2-3 col margin-auto">
                    {this.props.errors.map((error, i) => (
                        <p className="alert-error" key={`error-${i}`}>
                            <i className="error_icon"></i>
                            {error}
                        </p>
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
                    <div className="content-card span-2-3 col">
                        <h1>{this.formTypeMsgs()[0] + this.formTypeMsgs()[4]} team rocket</h1>
                        <p className="med-bottom-margin">quarreling.herokuapp.com/team-rocket</p>
                        <div className="span-2-3 col margin-auto">
                            <form onSubmit={this.handleSubmit} className="signin-form">
                                {this.props.formType === 'login' ? (
                                    <p>Enter your <strong>email address</strong> and <strong>password</strong>.</p>
                                ): (
                                    <p>Enter your <strong>email address</strong>, a <strong>display name</strong>,
                                     and <strong>password</strong> to get started.</p>
                                )}

                                <p style={{marginBottom: '0'}}>
                                    <input className={this.state.emailClass} type="email" placeholder="you@example.com" maxLength="40" size="40" onChange={this.update('email')}/>
                                </p>
                                {this.props.formType === 'signup' &&
                                    <p style={{marginBottom: '0'}}>
                                        <input className="session-input" type="text" placeholder='display name' size="40" maxLength="25" onChange={this.update('username')}/>
                                    </p>
                                }
                                <p className="small_bottom_margin">
                                    <input className={this.state.passwordClass} type="password" placeholder="password" size="40" maxLength="128" onChange={this.update('password')}/>
                                </p>
                                <p>
                                    <button className="form-btn" type="submit">
                                        <span>{this.formTypeMsgs()[0]}</span>
                                    </button>
                                </p>
                            </form>

                        </div>
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