import React from "react";
import PrimaryFooter from './primary_footer'
import Message from './message'
import {fetchChannelMessages} from '../util/messages_api_util'

class PrimaryView extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.fetchChannels();
        this.props.fetchAllMemberships();
    }

    render() {
        return (
            <div className="workspace-primary">
                <div className="msg-forward" style={{top: "0px"}}>
                    <h1 className="forward-channel-name">
                        <span>{`#${this.props.activeChannel.channelName}`}</span>
                    </h1>
                    <p className="forward-description">
                        This is the very beginning of the <strong>{this.props.activeChannel.channelName}</strong> channel.
                        Please stay on topic!
                    </p>
                </div>
                <div className="primary-contents">
                    {Object.values(this.props.messages).map((message, i) => {
                        if (message.id === this.props.activeChannel.id) {
                            return (<Message key={message.id} body={message.body} user={this.props.users[message.user_id]}/>)
                        }
                    })}
                </div>
                <PrimaryFooter currentUser={this.props.currentUser} activeChannel={this.props.activeChannel.channelName} />
            </div>
        )
    }
}

export default PrimaryView;