import React from 'react'
import NavTeamHeader from './team_header'

export default class TopNav extends React.Component {
    constructor(props) {
        super(props);
    }

    getMembers() {
        let res = [];
        for (let membership of this.props.memberships) {
            if (membership.channel_id === this.props.activeChannel.id) {
                res.push(membership.user_id)
            }
        }
        return res;
    }

    render() {
        const members = this.getMembers();

        return (
            <div className="workspace-top-nav">
                <div className="flex-top-nav">
                    <NavTeamHeader currentUser={this.props.currentUser} logoutUser={this.props.logoutUser}/> 
                    <div className="nav-channel-header">
                        <div className="channel-title-header">
                            <div className="nav-title">
                                {`# ${this.props.channels[this.props.activeChannel.id].channel_name}`}
                            </div>
                            <div className="nav-title-info">
                                <button className="channel-members-info">
                                    <i className="user-icon all-icons"></i>&nbsp;{members.length}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="nav-bonus-header">
                    </div>
                </div>
            </div>
        )
    }
}