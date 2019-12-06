import React from "react";

export default class PrimaryFooter extends React.Component {
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
            </footer>
        )
    }
}