import React from 'react'
import LoginFormContainer from './login_form_container'
import SignupFormContainer from './signup_form_container'
import WorkspaceContainer from './workspace_container'
import { Switch, Route } from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../util/route_util'

const App = () => (
    <Switch>
        <AuthRoute exact path='/' component={LoginFormContainer[1]}></AuthRoute>
        <AuthRoute exact path='/signin' component={LoginFormContainer[0]}></AuthRoute>
        <AuthRoute exact path='/signup' component={SignupFormContainer}></AuthRoute>
        <ProtectedRoute exact path='/teamrocket/:channelId' component={WorkspaceContainer}></ProtectedRoute>
    </Switch>
)

export default App;