import React from 'react'
import ChannelsList from './channels_list'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="workspace-sidebar">
                <nav className="channel-sidebar">
                    <div className="side-toolbar">
                        <button className="side-toolbar-btn">
                            Jump to...
                        </button>
                    </div>
                    <div className="channel-sidebar-list">
                        <div className="ws-scrollbar">
                            <div className="scrollbar-hider">
                                <div className="scrollbar-children" style={{width: '220px'}}>
                                    <ChannelsList channels={this.props.channels} users={this.props.users}
                                    userId ={this.props.userId} activeChannel={this.props.activeChannel}
                                    memberships={this.props.memberships}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Sidebar