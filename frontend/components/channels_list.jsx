import React from 'react'
import ReactModal from 'react-modal';
import Channel from './channel'
import {fetchMyChannels} from '../util/channels_api_util'

class ChannelsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            channels: [],
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        ReactModal.setAppElement(document.getElementById('root'));
        fetchMyChannels(this.props.currentUser.id)
            .then(res => Object.values(res))
            .then(
                (result) => {
                    this.setState({
                        showModal: false,
                        channels: result
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

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
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
                { this.state.channels.map((channel, i) => {
                    return (<Channel channel={channel} setActiveChannel={this.props.setActiveChannel} active={channel.id === this.props.activeChannel.id} />)
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
                        <div className="content-section" style={{width: '100%'}}>
                            <form>
                                <label><strong>Name</strong></label>
                                <div className="channel-name-input">
                                    <input type="text" className="add-channel-input" minLength="3" maxLength="42" placeholder="# e.g. Kpop"/>
                                </div>
                                <div className="create-channel-footer">
                                    <button className="create-channel-btn">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default ChannelsList;