import React from 'react'
import LoginFormContainer from './login_form_container'
import SignupFormContainer from './signup_form_container'
import Home from './home'
import Workspace from './workspace'
import { Switch, Route } from 'react-router-dom'

const App = () => (
    <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/signin' component={LoginFormContainer}></Route>
        <Route exact path='/signup' component={SignupFormContainer}></Route>
        <Route exact path='/workspace' component={Workspace}></Route>
    </Switch>
)

export default App;