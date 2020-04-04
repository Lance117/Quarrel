import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { updateMessage, deleteMessage } from '../actions/message_actions'
import { PrimaryFooter, PreviewFooter } from './primary_footer'
import Message from './message'

class ConnectedPrimaryView extends React.Component {
    constructor(props) {
        super(props);
        this.msgEndRef = React.createRef();
        this.state = {
            loaded: false,
        }
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        if (this.msgEndRef.current) this.scrollToBottom();
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
            return (<PrimaryFooter/>)
        }
        return (<PreviewFooter/>)
    }

    render() {
        if (!this.props.activeChannel) return null;
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
                                    <span>{`#${this.props.activeChannel.channel_name}`}</span>
                                </h1>
                                <p className="forward-description">
                                    This is the very beginning of the <strong>#{this.props.activeChannel.channel_name}</strong> channel.
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

// Connect component to Redux store
const mapStateToProps = (state, ownProps) => {
    const channelId = parseInt(ownProps.match.params.channelId);
    const channels = state.entities.channels;
    const activeChannel = channels[channelId];
    const users = state.entities.users;
    const userId = state.session.id;
    const messages = state.entities.messages;
    const memberships = Object.values(state.entities.memberships);
    return {activeChannel, users, userId, messages, memberships};
};

const mapDispatchToProps = dispatch => ({
    deleteMessage: message => dispatch(deleteMessage(message)),
    updateMessage: message => dispatch(updateMessage(message))
});

const PrimaryView = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedPrimaryView));
export default PrimaryView;