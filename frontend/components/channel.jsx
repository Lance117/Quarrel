import React from 'react'

class Channel extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.setActiveChannel(this.props.channel);
    }

    render() {
        return (
            <div style={{height: '26px'}} className={`active-${this.props.active}`} onClick={this.handleClick}>
                <span className={`channel-name active-${this.props.active}`}>{`# ${this.props.channel.channel_name}`}</span>
            </div>
        )
    }
}

export default Channel;