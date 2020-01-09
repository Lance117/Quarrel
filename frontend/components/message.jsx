import React, { useState } from "react";
import ReactModal from 'react-modal';
import Moment from 'react-moment'
import validator from 'validator'
import YouTube from 'react-youtube'
import stringHash from 'string-hash'

function Message(props) {
    const [showmodal, setShowmodal] = useState([false, null, null]);
    const avatars = [
        'https://ca.slack-edge.com/T03GU501J-UJZAX6WDU-g5e90ac62e9f-72',
        'https://ca.slack-edge.com/T03GU501J-UL2N3LG2X-gf1556aa48ff-72',
        'https://ca.slack-edge.com/T03GU501J-ULUDZ1QKS-g7b70ea0cbae-72',
        'https://ca.slack-edge.com/T03GU501J-UKT0C8SS1-g665db23aba0-72',
        'https://ca.slack-edge.com/T03GU501J-UMHG8Q2NA-g7eee62267eb-72',
        'https://ca.slack-edge.com/T03GU501J-ULNGNK0LC-g5f57353e5f4-72',
        'https://ca.slack-edge.com/T03GU501J-UBVJX8CB1-g59c98ec02a0-48',
        'https://ca.slack-edge.com/T03GU501J-UL4FRHEER-gebe3e59ff06-72',
        'https://ca.slack-edge.com/T03GU501J-ULXV025EG-g9d24e4c4d3d-72',
        'https://ca.slack-edge.com/T03GU501J-UDEMKU2KD-g99e9e862d66-72',
        'https://ca.slack-edge.com/T03GU501J-UPEMSDDF1-g642684ec089-72',
        'https://ca.slack-edge.com/T03GU501J-ULG8PH0F8-g1ff632e59b1-72',
        'https://ca.slack-edge.com/T03GU501J-UM3KRAGQ2-g2ab2756ba7a-72',
        'https://ca.slack-edge.com/T03GU501J-U4PP3VBR8-gb7de446f194-72',
        'https://ca.slack-edge.com/T03GU501J-UPA56QKSS-gc81d3abfcf5-512',
        'https://ca.slack-edge.com/T03GU501J-UH645JECU-gc4364aeb73c-512'
    ]
    let msgBody = createMsgBody(props.body);
    let className = "msg-list-item";
    if (props.lastMsg) className = className.concat(' last-msg');

    function handleOpenModal(e) {
        setShowmodal([true, e.nativeEvent.offsetX, e.nativeEvent.clientY]);
    }

    function handleCloseModal() {
        setShowmodal([false, null, null]);
    }

    function handleDelMsg() {
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
                    <img className="avatar-img" src={avatars[parseInt(stringHash(props.user.username))%avatars.length]} />
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
                        <button className="nav-modal-btn delete_msg" onClick={handleDelMsg}>
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
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
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
            res = (<a href={msgBody} target="_blank">{msgBody}</a>)
        }
    }
    return res;
}

export default Message;