import React from "react";

export class PrimaryFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.value) {
            this.props.createMessage({body: this.state.value, channel_id: this.props.channelId});
        }
        this.setState({value: ''});
    }

    render() {
        return (
            <footer className="primary-footer">
                <div className="msg-input">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="txt-editor"
                            placeholder={`Message #${this.props.activeChannelName}`}
                            onChange={this.handleChange} 
                            value={this.state.value}
                        />
                    </form>
                </div>
                <div className="msg-notification-bar">
                    <div className="bar-section">
                        {this.state.value && <span style={{marginRight: "16px", color: "#ababad"}}>
                            <b style={{fontFamily: 'Lato'}}>Return</b> to send
                        </span>}
                    </div>
                </div>
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