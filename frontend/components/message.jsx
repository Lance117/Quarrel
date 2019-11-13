import React from './react'

const Message = props => {
    return (
        <div className="msg-list-item">
            <div className="msg">
                <button className="msg-avatar">
                    <img className="avatar-img" src="https://ca.slack-edge.com/T03GU501J-UBVJX8CB1-g59c98ec02a0-48"/>
                </button>
                <div className="msg-contents">
                    <span className="msg-sender">Ralph Macchio</span>
                    <span className="msg-body">Hello, world!</span>
                </div>
            </div>
        </div>
    )
}