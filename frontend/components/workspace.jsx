import React from 'react'
import {TopNavContainer, SidebarContainer, PrimaryViewContainer} from './workspace_container'

// class Workspace extends React.Component {

// }
const Workspace = () => {
    return (
        <div className="workspace">
            <div className="client-grids">
                <div className="workspace-banner"></div>
                <TopNavContainer/>
                <SidebarContainer />
                <PrimaryViewContainer />
            </div>
        </div>
    )
}

export default Workspace