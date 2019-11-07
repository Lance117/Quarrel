import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = props => {
    const currentUser = props.currentUser;
    if (!currentUser) {
        return (
            <div>
                <h1>Sign in to see things</h1>
                <Link to="/signin">Login</Link>
            </div>
        )
    }
    return (
        <div>
            <h1>Welcome, {currentUser.username}!</h1>
            <button onClick={props.logoutUser}>
                logout!
            </button>
        </div>
    )
}

export default Sidebar