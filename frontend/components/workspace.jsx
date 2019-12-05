import React from 'react'
import TopNav from './top_nav'
import Sidebar from './sidebar'
import PrimaryView from './primary_view'

class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        let channels = this.props.fetchChannels();
        let messages = this.props.fetchMessages();
        let memberships = this.props.fetchAllMemberships();
        let users = this.props.fetchAllUsers();

        if (!this.state.isLoaded) {
            Promise.all([channels, messages, memberships, users])
                .then(
                    (r) => {
                        this.setState({isLoaded: true});
                    },
                    (e) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="workspace">
                    <div className="client-grids">
                        <div className="workspace-banner"></div>
                        <TopNav currentUser={this.props.currentUser} logoutUser={this.props.logoutUser} activeChannel={this.props.activeChannel} channels={this.props.channels}/>
                        <Sidebar channels={this.props.channels} users={this.props.users} userId={this.props.userId} createMembership={this.props.createMembership}
                        memberships={this.props.memberships} activeChannel={this.props.activeChannel} createChannel={this.props.createChannel}
                        history={this.props.history}/>
                        <PrimaryView channels={this.props.channels} users={this.props.users} activeChannel={this.props.activeChannel} messages={this.props.messages} currentUser={this.props.currentUser}/>
                    </div>
                </div>
            )
        }
    }
}

export default Workspace