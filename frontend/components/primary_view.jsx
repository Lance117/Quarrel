import React from "react";
import { PrimaryFooter, PreviewFooter } from './primary_footer'
import Moment from 'react-moment'
import validator from 'validator'
import YouTube from 'react-youtube'

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
                                        body={message.body} 
                                        user={this.props.users[message.user_id]} 
                                        timestamp={message.created_at}
                                        lastMsg={i === channelMsgs.length - 1}
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

const Message = props => {
    let msgBody = createMsgBody(props.body);
    let className = "msg-list-item";
    if (props.lastMsg) className = className.concat(' last-msg');

    return (
        <div className={className}>
            <div className="msg-avatar">
                <button className="msg-avatar-btn">
                    <img className="avatar-img" src="https://ca.slack-edge.com/T03GU501J-UBVJX8CB1-g59c98ec02a0-48" />
                </button>
            </div>
            <div className="msg-contents">
                <div className="sender-header">
                    <span className="msg-sender">{props.user.username}</span>
                    <span> </span>
                    <span className="timestamp"><Moment fromNow>{props.timestamp}</Moment></span>
                </div>
                <span className="msg-body">{msgBody}</span>
            </div>
        </div>
    )
}

// helpers
const youtubeParser = url => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function createMsgBody(msgBody) {
    const mediaExt = 'jpg jpeg png gif svg'.split(' ');
    let res = msgBody;
    if (validator.isURL(msgBody)) {
        let urlParts = msgBody.split('.');
        let ext = urlParts[urlParts.length - 1];
        if (mediaExt.includes(ext)) {
            res = (
                <img src={msgBody} style={{maxHeight: "360px", maxWidth: "360px"}}></img>
            );
        } else if (youtubeParser(msgBody)) {
            res = (
                <YouTube
                    videoId={youtubeParser(msgBody)}
                    opts={{
                        playerVars: {
                            autoplay: -1
                        }
                    }}
                />
            )
        } else {
            res = (<a href={msgBody} target="_blank" style={{ color: "#1D9BD1" }}>{msgBody}</a>)
        }
    }
    return res;
}

export default PrimaryView;