import React from 'react'
import LoginFormContainer from './login_form_container'
import SignupFormContainer from './signup_form_container'
import Home from './home'
import Workspace from './workspace'
import { Switch, Route } from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../util/route_util'

const App = () => (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <AuthRoute exact path='/signin' component={LoginFormContainer}></AuthRoute>
        <AuthRoute exact path='/signup' component={SignupFormContainer}></AuthRoute>
        <ProtectedRoute exact path='/workspace' component={Workspace}></ProtectedRoute>
    </Switch>
)

export default App;