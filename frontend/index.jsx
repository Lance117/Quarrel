import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store'
import {signup, login, logout} from './util/session_api_util'
import Root from './components/root'

document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            session: {id: window.currentUser.id, username: window.currentUser.username}
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    // test on window
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.signup = signup;
    window.logout = logout;
    //-----------

    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, root);
})