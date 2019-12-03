import React from 'react'
import ReactModal from 'react-modal';
import Channel from './channel'
import {fetchMyChannels} from '../util/channels_api_util'

class ChannelsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        ReactModal.setAppElement(document.getElementById('root'));
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    myChannels() {
        let res = [];
        for (let membership of this.props.memberships) {
            if (membership.user_id === this.props.userId) {
                res.push(this.props.channels[membership.channel_id]);
            }
        }
        return res;
    }

    render() {
        return (
            <div className="channels-list">
                <div style={{height: '12px'}}></div>
                <div className="sidebar-section-heading">
                    <button className="channel-section-heading">Channels</button>
                    <div className="section-heading-right">
                        <button className="add-channel-btn" onClick={this.handleOpenModal}></button>
                    </div>
                </div>
                { this.myChannels().map((channel, i) => {
                    return (<Channel key={channel.id} channel={channel} setActiveChannel={this.props.setActiveChannel} active={channel.id === this.props.activeChannel.id} />)
                })}
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Add Channel"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                    className="add-channel-modal"
                    overlayClassName="add-channel-popover"
                >
                    <div className="add-channel-header">
                        <div className="format-channel-header">
                            <h1>Create a channel</h1>
                        </div>
                    </div>
                    <div className="add-channel-content">
                        <div className="add-channel-description">
                            Channels are the battlegrounds for discussions and arguments.
                            They're best when organized around a topic — #ramen, for example.
                        </div>
                        <br></br>
                        <div className="content-section" style={{width: '100%'}}>
                            <AddChannelForm /> 
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

class AddChannelForm extends React.Component {
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
    }

    render() {
        let btnClass = this.state.value.length === 0 ? "btn-disabled" : "btn-enabled";
        return (
            <form>
                <label><strong>Name</strong></label>
                <div className="channel-name-input">
                    <input type="text" className="add-channel-input" minLength="3" maxLength="42" placeholder="# e.g. Kpop" onChange={this.handleChange} />
                </div>
                <div className="create-channel-footer">
                    <button className={btnClass}>Create</button>
                </div>
            </form> 
        )
    }
}

export default ChannelsList;