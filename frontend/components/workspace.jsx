import React from 'react'
import {TopNavContainer, SidebarContainer} from './workspace_container'
import PrimaryView from './primary_view'
import PrimaryFooter from './primary_footer'

// class Workspace extends React.Component {

// }
const Workspace = () => {
    return (
        <div className="workspace">
            <div className="client-grids">
                <div className="workspace-banner"></div>
                <TopNavContainer/>
                <SidebarContainer />
                <PrimaryView />
            </div>
        </div>
    )
}

export default Workspace