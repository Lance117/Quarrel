import React from 'react'
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

class Channel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            offsetX: null,
            offsetY: null
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelClick = this.handleDelClick.bind(this);
    }

    handleOpenModal(e) {
        e.preventDefault();
        this.setState({ showModal: true, offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.clientY });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleClick() {
        window.localStorage.setItem('lastVisited', this.props.channel.id);
    }

    getMembership() {
        for (const membership of this.props.memberships) {
            if (membership.user_id === this.props.userId &&
                membership.channel_id === this.props.channel.id) {
                    return {id: membership.id};
                }
        }
        return null;
    }

    handleDelClick(e) {
        e.preventDefault();
        $.when(this.props.deleteMembership(this.getMembership())).then(r => {
            if (this.props.active) window.localStorage.setItem('lastVisited', 1);
            this.props.history.push("1");
        }), err => {
            console.log(err)
        };
    }

    render() {
        const propState = this;
        App.comments = App.cable.subscriptions.create({
            channel: 'MessagesChannel',
            channelId: `${this.props.channel.id}`
        }, {
            received: function(data) {
                propState.props.receiveMessage(data)
            }
        });
        return (
            <div style={{height: '26px'}} className={`active-${this.props.active}`} onContextMenu={this.handleOpenModal}>
                <Link to={`/teamrocket/${this.props.channel.id}`} style={{textDecoration: 'none'}} onClick={this.handleClick}>
                    <span className={`channel-name active-${this.props.active}`}>{`# ${this.props.channel.channel_name}`}</span>
                </Link>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Context Menu"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                    overlayClassName="popover"
                    style={{
                        content: {
                            top: this.state.offsetY,
                            left: this.state.offsetX,
                            right: 'null',
                            borderRadius: 'null',
                            bottom: 'null',
                            border: 'null',
                            background: 'null',
                            overflow: 'null',
                            position: 'absolute',
                            outline: 'none',
                            padding: 'null',
                            transitionDuration: '80ms',
                        }
                    }}
                >
                    <div className="nav-modal-menu" style={{width: "300px"}}>
                        <div style={{margin: "0", padding: "12px 0", background: "#2c2d30"}}>
                            <div className="nav-modal-item">
                                <button className="nav-modal-btn" onClick={this.handleDelClick}>
                                    <div className="nav-item-label">{`Leave #${this.props.channel.channel_name}`}</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default Channel;