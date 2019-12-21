import React from 'react'
import ReactModal from 'react-modal';
import NavTeamHeader from './team_header'

export default class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSettings: false,
            showMembers: false
        };
        this.handleOpenSettings = this.handleOpenSettings.bind(this);
        this.handleCloseSettings = this.handleCloseSettings.bind(this);
        this.handleOpenMembers = this.handleOpenMembers.bind(this);
        this.handleCloseMembers = this.handleCloseMembers.bind(this);
        this.handleDelClick = this.handleDelClick.bind(this);
    }

    handleOpenSettings(e) {
        this.setState({ showSettings: true });
    }

    handleCloseSettings() {
        this.setState({ showSettings: false });
    }

    handleOpenMembers(e) {
        this.setState({ showMembers: true });
    }

    handleCloseMembers() {
        this.setState({ showMembers: false });
    }

    handleDelClick(e) {
        e.preventDefault();
        $.when(this.props.deleteMembership(this.getMembership())).then(r => {
            this.handleCloseSettings();
            if (this.props.active) window.localStorage.setItem('lastVisited', 1);
            this.props.history.push("1");
        }), err => {
            console.log(err)
        };
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

    getMembership() {
        for (const membership of this.props.memberships) {
            if (membership.user_id === this.props.userId &&
                membership.channel_id === this.props.activeChannel.id) {
                    return {id: membership.id};
                }
        }
        return null;
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
                            <button className="nav-btn common-btn" onClick={this.handleOpenSettings}>
                                <i className="all-icons settings-icon"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <ReactModal
                    isOpen={this.state.showSettings}
                    contentLabel="Channel settings"
                    onRequestClose={this.handleCloseSettings}
                    shouldCloseOnOverlayClick={true}
                    overlayClassName="popover"
                    style={{
                        content: {
                            top: '46px',
                            left: 'null',
                            right: '15px',
                            position: 'absolute',
                            outline: 'none',
                            transitionDuration: '80ms',
                            borderRadius: 'null',
                            bottom: 'null',
                            border: 'null',
                            background: 'null',
                            overflow: 'null',
                            padding: 'null',
                        }
                    }}
                >
                    <div className="actions-menu" style={{ width: "auto" }}>
                        <div className="nav-modal-item">
                            <button className="nav-modal-btn" onClick={this.handleDelClick}>
                                <div className="nav-item-label">{`Leave #${this.props.channels[this.props.activeChannel.id].channel_name}`}</div>
                            </button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}