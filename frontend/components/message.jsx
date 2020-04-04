import React, { useEffect, useState, useRef } from "react";
import ReactModal from 'react-modal';
import Moment from 'react-moment'
import validator from 'validator'
import YouTube from 'react-youtube'
import stringHash from 'string-hash'
import ReactQuill, { Quill } from 'react-quill';
import { Picker } from 'emoji-mart';
import { avatars } from '../util/helpers';
import ContentLoader from 'react-content-loader';

function Message(props) {
    const [showmodal, setShowmodal] = useState([false, null, null]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    let msgBody = createMsgBody(props.body);
    let className = "msg-list-item";
    if (props.lastMsg) className = className.concat(' last-msg');
    if (editMode) className = className.concat(' edit-list-item');
    const textInput = useRef(null);
    const msgStyle = loading ? {display: 'none'} : {};

    useEffect(() => {
        if (!['video', 'img'].includes(msgBody[1])) {
            setLoading(false);
        }
    })

    function handleOpenModal(e) {
        setShowmodal([true, e.nativeEvent.offsetX, e.nativeEvent.clientY]);
    }

    function handleCloseModal() {
        setShowmodal([false, null, null]);
    }

    function handleOpenEditMode() {
        setEditMode(true);
        setShowmodal([false, null, null]);
    }

    function handleCloseEditMode() {
        setEditMode(false);
    }

    function handleDelMsg() {
        props.deleteMessage({id: props.msgId}).then(r => {
            handleCloseModal();
        }), err => {
            console.log(err)
        };
    }

    function handleUpdateMsg() {
        props.updateMessage({ body: textInput.current.getEditor().getText().trim(), id: props.msgId}).then(r => {
            handleCloseEditMode();
        }), err => {
            console.log(err)
        };
    }

    // helpers
    function youtubeParser(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    function createMsgBody(msgBody) {
        const mediaExt = 'jpg jpeg png gif svg'.split(' ');
        let res = [msgBody, 'txt'];
        if (validator.isURL(msgBody)) {
            let urlParts = msgBody.split('.');
            let ext = urlParts[urlParts.length - 1];
            if (mediaExt.includes(ext)) {
                res = [(
                    <img src={msgBody}
                        style={{maxHeight: "360px", maxWidth: "360px"}}
                        onLoad={() => setLoading(false)}
                    >
                    </img>
                ), 'img'];
            } else if (youtubeParser(msgBody)) {
                res = [(
                    <YouTube
                        videoId={youtubeParser(msgBody)}
                        onReady={() => setLoading(false)}
                        opts={{
                            playerVars: {
                                autoplay: -1
                            }
                        }}
                    />
                ), 'video']
            } else {
                res = [(<a href={msgBody} target="_blank">{msgBody}</a>), 'link']
            }
        }
        return res;
    }

    return (
        <div className={className}>
            {loading && msgBody[1] === 'video' &&
                <ContentLoader viewBox="0 0 740 392"
                    width="740" height="392"
                    backgroundColor="#19171D"
                    foregroundColor="#222529"
                    speed="2"
                >
                    <rect x="64" y="24" rx="3" ry="3" width="640" height="360"/>
                    <rect x="20" y="6" rx="3" ry="3" width="36" height="36"/>
                    <rect x="64" y="6" rx="3" ry="3" width="168" height="15"/>
                </ContentLoader>
            }
            {loading && msgBody[1] === 'img' &&
                <ContentLoader viewBox="0 0 740 392"
                    width="740" height="392"
                    backgroundColor="#19171D"
                    foregroundColor="#222529"
                    speed="2"
                >
                    <rect x="64" y="24" rx="3" ry="3" width="360" height="360"/>
                    <rect x="20" y="6" rx="3" ry="3" width="36" height="36"/>
                    <rect x="64" y="6" rx="3" ry="3" width="168" height="15"/>
                </ContentLoader>
            }
            <div className="msg-avatar" style={msgStyle}>
                <button className="msg-avatar-btn">
                    <img className="avatar-img" src={avatars[parseInt(stringHash(props.user.username))%avatars.length]} />
                </button>
            </div>
            {!editMode && <div className="msg-contents" style={msgStyle}>
                <div className="sender-header">
                    <span className="msg-sender">{props.user.username}</span>
                    <span> </span>
                    <span className="timestamp"><Moment fromNow>{props.timestamp}</Moment></span>
                </div>
                <span className="msg-body">{msgBody[0]}</span>
            </div>}
            {!editMode && props.isSender && <div className="msg-actions">
                <button className="msg-actions-btn all-icons" onClick={handleOpenModal}>
                    <i className="all-icons ellipsis"></i>
                </button>
            </div>}
            {editMode && <div style={{paddingLeft: '70px'}}>
                <ReactQuill
                    className='msg_editor_container'
                    ref={textInput}
                    theme={null}
                    defaultValue={props.body}
                    handleEnter={handleUpdateMsg}
                    modules={{
                        keyboard: {
                            bindings: {
                                enter: {
                                    key: 13,
                                    handler: handleUpdateMsg 
                                }
                            }
                        }
                    }}
                />
                <div className="msg_editor_footer">
                    <button className="btn-small btn-outline c-button" onClick={handleCloseEditMode}>Cancel</button>
                    <button className="c-button msg_editor_save btn-small" onClick={handleUpdateMsg}>
                        <i className="edit_save_icon"></i>
                        Save Changes
                    </button>
                </div>
            </div>}

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
                        <button className="nav-modal-btn" onClick={handleOpenEditMode}>
                            <div className="nav-item-label">Edit message</div>
                        </button>
                    </div>
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


export default Message;