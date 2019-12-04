import React from 'react'
import NavTeamHeader from './team_header'

class TopNav extends React.Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    //     this.props.fetchAllUsers();
    // }

    render() {
        return (
            <div className="workspace-top-nav">
                <div className="flex-top-nav">
                    <NavTeamHeader currentUser={this.props.currentUser} logoutUser={this.props.logoutUser}/> 
                    <div className="nav-channel-header">
                        <div className="nav-title">
                            {`# ${this.props.channels[this.props.activeChannel.id].channel_name}`}
                        </div>
                    </div>
                    <div className="nav-bonus-header">
                    </div>
                </div>
            </div>
        )
    }
}

export default TopNav;