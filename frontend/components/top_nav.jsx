import React from 'react'
import ReactModal from 'react-modal';
import NavTeamHeader from './team_header'

export default class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSettings: [false, null, null],
            showMembers: [false, null, null]
        };
    }

    handleOpenSettings() {
        this.setState({ showSettings: [true, e.nativeEvent.offsetX, e.nativeEvent.clientY] });
    }

    handleCloseSettings() {
        this.setState({ showSettings: [false, null, null] });
    }

    handleOpenMembers() {
        this.setState({ showMembers: [true, e.nativeEvent.offsetX, e.nativeEvent.clientY] });
    }

    handleCloseMembers() {
        this.setState({ showMembers: [false, null, null] });
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
                                <button className="channel-members-info common-btn">
                                    <i className="user-icon all-icons"></i>&nbsp;{members.length}
                                </button>
                            </div>
                        </div>
                        <div className="nav-buttons">
                            <button className="nav-btn common-btn">
                                <i className="all-icons settings-icon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}