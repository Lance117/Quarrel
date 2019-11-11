import React from 'react'

const TopNav = props => {
    return (
    <div className="workspace-top-nav">
        <div className="flex-top-nav">
            <div className="nav-team-header">
                <div className="nav-team-name header-content">
                    <div className="team-header-section">
                        <div className="team-name">Team Rocket</div>
                        <button className="team-header-icon" type="button">
                            <i className="down-icon all-icons"></i>
                        </button>
                    </div>
                    <div className="nav-user-header">
                        <i className="presence-icon small-icons all-icons"></i>
                        <span className="nav-username">
                            {props.currentUser.username}
                        </span>
                    </div>
                </div>
            </div>
            <div className="nav-channel-header">
                <div className="nav-title">
                    #general
                </div>
            </div>
            <div className="nav-bonus-header">
            </div>
        </div>
    </div>
)}

export default TopNav;