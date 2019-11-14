import React from 'react'
import ReactModal from 'react-modal';

class ChannelsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
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
                <div style={{height: '26px'}}>
                    <span className="channel-name"># channel placeholder</span>
                </div>
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