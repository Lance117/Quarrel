import React from "react";
import ReactQuill, { Quill } from 'react-quill';
import ReactModal from 'react-modal';
import { Picker } from 'emoji-mart'

export class PrimaryFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showEmojis: false
        };

        this.textInput = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenEmojis = this.handleOpenEmojis.bind(this);
        this.handleCloseEmojis = this.handleCloseEmojis.bind(this);
        this.handleEmoji = this.handleEmoji.bind(this);
        this.focusTextInput = this.focusTextInput.bind(this);
    }


    focusTextInput() {
        this.textInput.current.focus();
    }

    handleChange(html) {
        this.setState({value: html});
    }

    handleOpenEmojis() {
        this.setState({showEmojis: true});
    }

    handleEmoji(emoji) {
        this.textInput.current.getEditor().insertText(this.textInput.current.getEditor().getSelection().index, emoji.native);
        this.handleCloseEmojis();
    }

    handleCloseEmojis() {
        this.setState({showEmojis: false});
    }

    inputEmpty() {
        return this.state.value && this.state.value != '<p><br></p>';
    }

    handleSubmit() {
        // debugger
        if (this.inputEmpty()) {
            this.props.createMessage({ body: this.textInput.current.getEditor().getText().trim(), channel_id: this.props.channelId});
        }
        this.setState({value: ''});
    }

    componentDidMount() {
        document.querySelector('.ql-editor').setAttribute("data-placeholder", `Message #${this.props.activeChannelName}`);
        document.getElementById('quillEditor').appendChild(document.getElementById('fileInput'));
        document.getElementsByClassName('ql-container')[0].appendChild(document.getElementById('ql-buttons'));
    }

    componentDidUpdate() {
        document.querySelector('.ql-editor').setAttribute("data-placeholder", `Message #${this.props.activeChannelName}`);
    }

    render() {
        return (
            <footer className="primary-footer">
                <div className="msg-input" onClick={this.focusTextInput}>
                    <div className="msg_input_inner">
                        <ReactQuill
                            id={'quillEditor'}
                            ref={this.textInput}
                            theme={null}
                            value={this.state.value}
                            onChange={this.handleChange}
                            handleEnter={this.handleSubmit}
                            modules={{
                                keyboard: {
                                    bindings: {
                                        enter: {
                                            key: 13,
                                            handler: this.handleSubmit
                                        }
                                    }
                                }
                            }}
                        />
                        <div id="ql-buttons">
                            <button className="texty_input_button all-icons common-btn" onClick={this.handleOpenEmojis}>
                                <i className="all-icons smile_icon"></i>
                            </button>
                        </div>
                        <button className="msg_input_file_btn common-btn" id="fileInput">
                            <i className="msg_input_file_icon all-icons"></i>
                        </button>
                    </div>
                </div>
                <div className="msg-notification-bar">
                    <div className="bar-section">
                        {this.inputEmpty() &&
                            <span style={{color: '#ababad'}}>
                                <span style={{marginRight: "16px"}}>
                                    <b style={{fontFamily: 'Lato'}}>Return</b> to send
                                </span>
                                <b style={{marginRight: '0'}}>Shift + Return</b> to add a new line
                            </span>
                        }
                    </div>
                </div>

                <ReactModal
                    isOpen={this.state.showEmojis}
                    contentLabel="emojis"
                    onRequestClose={this.handleCloseEmojis}
                    shouldCloseOnOverlayClick={true}
                    overlayClassName="popover"
                    style={{
                        content: {
                            // top: '10%',
                            // left: '62.5%',
                            right: 'null',
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
                    <Picker darkMode='true' onSelect={this.handleEmoji} />
                </ReactModal>
            </footer>
        )
    }
}

export function PreviewFooter(props) {
    const handleClick = e => {
        e.preventDefault();
        props.createMembership({user_id: props.userId, channel_id: props.channelId});
    }

    return (
        <footer className="preview-footer">
            <div className="preview-subtitle">
                You are viewing <strong>{`#${props.activeChannelName}`}</strong>
            </div>
            <div className="preview-msg">Click "join channel" to jump in on the conversation!</div>
            <button className="preview-btn" onClick={handleClick}>Join Channel</button>
        </footer>
    )
}