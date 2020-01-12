import React from "react";
import { PrimaryFooter, PreviewFooter } from './primary_footer'
import Message from './message'

class PrimaryView extends React.Component {
    constructor(props) {
        super(props);
        this.msgEndRef = React.createRef();
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.msgEndRef.current.scrollTop = this.msgEndRef.current.scrollHeight;
    }

    isMember() {
        for (const membership of this.props.memberships) {
            if (membership.user_id === this.props.userId && this.props.activeChannel.id === membership.channel_id) {
                return true;
            }
        }
        return false;
    }

    chooseFooter() {
        if (this.isMember()) {
            return (
                <PrimaryFooter
                    currentUser={this.props.currentUser}
                    channelId={this.props.activeChannel.id}
                    activeChannelName={this.props.channels[this.props.activeChannel.id].channel_name} 
                    createMessage={this.props.createMessage}
                />
            )
        }
        return (
            <PreviewFooter
                activeChannelName={this.props.channels[this.props.activeChannel.id].channel_name}
                createMembership={this.props.createMembership}
                userId={this.props.userId}
                channelId={this.props.activeChannel.id}
            />
        )
    }

    render() {
        let channelMsgs = Object.values(this.props.messages).filter(msg => {
            return msg.channel_id === this.props.activeChannel.id;
        })
        return (
            <div className="workspace-primary">
                <div className="primary-contents">
                    <div className="primary-body">
                        <div className="msg-pane" ref={this.msgEndRef}>
                            <div className="msg-forward" style={{top: "0px"}}>
                                <h1 className="forward-channel-name">
                                    <span>{`#${this.props.channels[this.props.activeChannel.id].channel_name}`}</span>
                                </h1>
                                <p className="forward-description">
                                    This is the very beginning of the <strong>#{this.props.channels[this.props.activeChannel.id].channel_name}</strong> channel.
                                    Please stay on topic!
                                </p>
                            </div>
                            {channelMsgs.map((message, i) => {
                                return (
                                    <Message
                                        key={message.id}
                                        msgId={message.id}
                                        body={message.body} 
                                        user={this.props.users[message.user_id]} 
                                        isSender={this.props.users[message.user_id].id === this.props.userId}
                                        timestamp={message.created_at}
                                        lastMsg={i === channelMsgs.length - 1}
                                        deleteMessage={this.props.deleteMessage}
                                        updateMessage={this.props.updateMessage}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    {this.chooseFooter()}
                </div>
            </div>
        )
    }
}

export default PrimaryView;