import React from 'react'
import Moment from 'react-moment'

const Message = props => {
    return (
        <div className="msg-list-item">
            <div className="msg-avatar">
                <button className="msg-avatar-btn">
                    <img className="avatar-img" src="https://ca.slack-edge.com/T03GU501J-UBVJX8CB1-g59c98ec02a0-48"/>
                </button>
            </div>
            <div className="msg-contents">
                <div className="sender-header">
                    <span className="msg-sender">{props.user.username}</span>
                    <span> </span>
                    <span className="timestamp"><Moment format="LT">{props.timestamp}</Moment></span>
                </div>
                <span className="msg-body">{props.body}</span>
            </div>
        </div>
    )
}

export default Message