import React from 'react'
import TopNav from './top_nav'
import Sidebar from './sidebar'
import PrimaryView from './primary_view'

class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            channelsLoaded: false,
            messagesLoaded: false,
            membershipsLoaded: false,
            usersLoaded: false
        };
    }

    componentDidMount() {
        if (!this.state.channelsLoaded) {
            this.props.fetchChannels()
                .then(
                    (r) => {
                        this.setState({channelsLoaded: true});
                    },
                    (e) => {
                        this.setState({
                            channelsLoaded: true,
                            error
                        });
                    }
                )
        }
        if (!this.state.messagesLoaded) {
            this.props.fetchMessages()
                .then(
                    (r) => {
                        this.setState({messagesLoaded: true});
                    },
                    (e) => {
                        this.setState({
                            messagesLoaded: true,
                            error
                        });
                    }
                )
        }
        if (!this.state.membershipsLoaded) {
            this.props.fetchAllMemberships()
                .then(
                    (r) => {
                        this.setState({membershipsLoaded: true});
                    },
                    (e) => {
                        this.setState({
                            membershipsLoaded: true,
                            error
                        });
                    }
                )
        }
        if (!this.state.usersLoaded) {
            this.props.fetchAllUsers()
                .then(
                    (r) => {
                        this.setState({usersLoaded: true});
                    },
                    (e) => {
                        this.setState({
                            usersLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    render() {
        const { error, channelsLoaded, membershipsLoaded, messagesLoaded, usersLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!(channelsLoaded || membershipsLoaded || messagesLoaded || usersLoaded)) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="workspace">
                    <div className="client-grids">
                        <div className="workspace-banner"></div>
                        <TopNav currentUser={this.props.currentUser} logoutUser={this.props.logoutUser} activeChannel={this.props.activeChannel}/>
                        <Sidebar channels={this.props.channels} users={this.props.users}
                        memberships={this.props.memberships} setActiveChannel={this.props.setActiveChannel}/>
                        <PrimaryView activeChannel={this.props.activeChannel} messages={this.props.messages} currentUser={this.props.currentUser}/>
                    </div>
                </div>
            )
        }
    }
}

export default Workspace