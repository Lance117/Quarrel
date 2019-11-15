import React from "react";
import PrimaryFooter from './primary_footer'
import Message from './message'
import {fetchChannelMessages} from '../util/messages_api_util'

class PrimaryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    };

    componentDidMount() {
        fetchChannelMessages(this.props.activeChannel.id)
            .then(res => Object.values(res))
            .then(
                (result) => {
                    this.setState({
                        messages: result
                    });
                },
                (error) => {
                    this.setState({
                        showModal: false,
                        error
                    });
                }
            )
    }

    render() {
        console.log(this.state.messages)
        console.log(this.props.activeChannel)
        return (
            <div className="workspace-primary">
                <div className="primary-contents">
                    {Object.values(this.state.messages).map((message, i) => {
                        return (<Message body={message.body}/>)
                    })}
                </div>
                <PrimaryFooter currentUser={this.props.currentUser} />
            </div>
        )
    }
}

export default PrimaryView;