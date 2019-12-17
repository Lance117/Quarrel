import React, { useState } from "react";
import ReactModal from 'react-modal';
import Moment from 'react-moment'
import validator from 'validator'
import YouTube from 'react-youtube'

function Message(props) {
    const [showmodal, setShowmodal] = useState([false, null, null]);
    let msgBody = createMsgBody(props.body);
    let className = "msg-list-item";
    if (props.lastMsg) className = className.concat(' last-msg');

    function handleOpenModal(e) {
        e.preventDefault();
        setShowmodal([true, e.nativeEvent.offsetX, e.nativeEvent.clientY]);
    }

    function handleCloseModal() {
        setShowmodal([false, null, null]);
    }

    function handleDelMsg(e) {
        e.preventDefault();
        props.deleteMessage({id: props.msgId}).then(r => {
            handleCloseModal();
        }), err => {
            console.log(err)
        };
    }

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
            <div className="msg-actions">
                <button className="msg-actions-btn all-icons" onClick={handleOpenModal}>
                    {props.isSender && <i className="all-icons ellipsis"></i>}
                </button>
            </div>

            <ReactModal
                isOpen={showmodal[0]}
                contentLabel="Message actions"
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={true}
                overlayClassName="popover"
                style={{
                    content: {
                        top: showmodal[2],
                        left: 'null',
                        right: showmodal[1],
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
                <div className="actions-menu" style={{width: "300px"}}>
                    <div className="nav-modal-item">
                        <button className="nav-modal-btn" onClick={handleDelMsg}>
                            <div className="nav-item-label">Delete message</div>
                        </button>
                    </div>
                </div>
            </ReactModal>
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

export default Message;