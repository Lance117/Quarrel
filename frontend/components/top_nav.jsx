import React from 'react'
import NavTeamHeader from './team_header'

const TopNav = props => {
    return (
    <div className="workspace-top-nav">
        <div className="flex-top-nav">
            <NavTeamHeader currentUser={props.currentUser.username} logoutUser={props.logoutUser}/> 
            <div className="nav-channel-header">
                <div className="nav-title">
                    {`# ${props.activeChannel.channelName}`}
                </div>
            </div>
            <div className="nav-bonus-header">
            </div>
        </div>
    </div>
)}
export default TopNav;