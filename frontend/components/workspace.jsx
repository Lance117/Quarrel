import React from 'react'
import NavLink from 'react-router-dom'
import Sidebar from './sidebar'

// class Workspace extends React.Component {

// }
const Workspace = () => {
    return (
        <div className="client-container">
            <div className="workspace-pane">
                <Sidebar />
            </div>
            <h1>hello, world!</h1>
        </div>
    )
}

export default Workspace