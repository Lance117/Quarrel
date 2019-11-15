import React from 'react'
import ChannelsList from './channels_list'

const Sidebar = props => {
    props.fetchChannels();
    return (
        <div className="workspace-sidebar">
            <nav className="channel-sidebar">
                <div className="side-toolbar">
                    <button className="side-toolbar-btn" onClick={props.logoutUser}>
                        Sign out temp
                    </button>
                </div>
                <div className="channel-sidebar-list">
                    <div className="ws-scrollbar">
                        <div className="scrollbar-hider">
                            <div className="scrollbar-children" style={{width: '220px'}}>
                                <ChannelsList currentUser={props.currentUser} activeChannel={props.activeChannel} setActiveChannel={props.setActiveChannel}/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar