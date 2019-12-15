import React from 'react'
import ReactModal from 'react-modal';
import Channel from './channel'

class ChannelsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showChannels: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenChannels = this.handleOpenChannels.bind(this);
        this.handleCloseChannels = this.handleCloseChannels.bind(this);
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

    handleOpenChannels() {
        this.setState({ showChannels: true });
    }

    handleCloseChannels() {
        this.setState({ showChannels: false });
    }

    myChannels() {
        let res = [];
        let active = false;
        for (let membership of this.props.memberships) {
            if (membership.user_id === this.props.userId) {
                if (membership.channel_id === this.props.activeChannel.id) active = true;
                res.push(this.props.channels[membership.channel_id]);
            }
        }
        if (!active) res.push(this.props.channels[this.props.activeChannel.id]);
        return res;
    }

    render() {
        return (
            <div className="channels-list">
                <div style={{height: '12px'}}></div>
                <div className="sidebar-section-heading">
                    <button className="channel-section-heading" onClick={this.handleOpenChannels}>Channels</button>
                    <div className="section-heading-right">
                        <button className="add-channel-btn" onClick={this.handleOpenModal}></button>
                    </div>
                </div>
                { this.myChannels().map((channel, i) => {
                    return (
                        <Channel
                            key={channel.id}
                            channel={channel}
                            active={channel.id === this.props.activeChannel.id}
                            deleteMembership={this.props.deleteMembership}
                            memberships={this.props.memberships}
                            userId={this.props.userId}
                            history={this.props.history}
                        />
                    )
                })}
                {/* Modal for adding channels */}
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
                            <AddChannelForm 
                                createChannel={this.props.createChannel}
                                createMembership={this.props.createMembership}
                                userId={this.props.userId}
                                history={this.props.history}
                                handleCloseModal={this.handleCloseModal}
                            /> 
                        </div>
                    </div>
                </ReactModal>

                {/* Modal for viewing all channels */}
                <ReactModal
                    isOpen={this.state.showChannels}
                    contentLabel="Browse channels"
                    onRequestClose={this.handleCloseChannel}
                    shouldCloseOnOverlayClick={true}
                    className="all-channels-content"
                    overlayClassName="all-channels-overlay"
                >
                    <button className="all-channels-close-btn" onClick={this.handleCloseChannels}>
                        <i className="close-modal-icon"></i>
                        <span style={{marginTop: "-4px", fontSize: "13px", fontFamily: 'Lato-norm'}}>esc</span>
                    </button>
                    <div className="channel-browser-body">
                        <div className="channel-browser-content">
                            <div className="channel-browser-header"><h1>Browse Channels</h1></div>
                            <div className="channel-browser-list-container">
                                <div className="channels-list" style={{width: "640px", height: "255px"}}>
                                    <div className="channel-scrollbar">
                                        <div style={{width: "640px", position: "relative"}}>
                                            <div style={{top: "0px", position: "absolute", width: "100%"}}>
                                                <div className="channel-browser-section-header" style={{paddingTop: "0"}}>
                                                    Channels you can join
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        $.when(this.props.createChannel({channel_name: this.state.value})).then(r => {
            this.props.createMembership({user_id: this.props.userId, channel_id: r.channel.id})
                .then(res => {
                    this.props.handleCloseModal()
                    this.props.history.push(`${res.membership.channel_id}`)
                }), e => {
                    console.log(e);
                };
        }), err => {
            console.log(err)
        };
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
                    <button className={btnClass} onClick={this.handleSubmit}>Create</button>
                </div>
            </form> 
        )
    }
}

export default ChannelsList;