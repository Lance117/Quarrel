import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store'
import {login, logout} from './util/session_api_util'
import Root from './components/root'

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const store = configureStore();
    // test on window
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.login = login;
    window.logout = logout;
    //-----------

    ReactDOM.render(<Root />, root);
})