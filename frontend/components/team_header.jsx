import React from 'react'
import ReactModal from 'react-modal';
import stringHash from 'string-hash'

class NavTeamHeader extends React.Component {
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
            <div className="nav-team-header">
                <div className="nav-team-name header-content">
                    <div className="team-header-section">
                        <div className="team-name" onClick={this.handleOpenModal}>Team Rocket</div>
                        <button className="team-header-icon" type="button" onClick={this.handleOpenModal}>
                            <i className="down-icon all-icons"></i>
                        </button>
                    </div>
                    <div className="nav-user-header">
                        <i className="presence-icon small-icons all-icons"></i>
                        <span className="nav-username" onClick={this.handleOpenModal}>
                            {this.props.currentUser}
                        </span>
                    </div>
                </div>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Team Menu"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                    className="nav-modal"
                    overlayClassName="popover"
                >
                    <div className="nav-modal-menu" style={{width: '300px'}}>
                        <div className="nav-modal-items">
                            <div className="team-menu-blurb">
                                <span className="team-blurb-icon all-avatar" style={{height: '36px', lineHeight: '36px', width: '36px'}}>
                                    <img className='avatar-img' src={this.props.avatars[parseInt(stringHash(this.props.currentUser)) % this.props.avatars.length]} />
                                </span>
                                <div className="blurb-right">
                                    <div style={{fontWeight: '900', color: '#d1d2d3', fontFamily: 'lato'}}>
                                        {this.props.currentUser}
                                    </div>
                                </div>
                            </div>
                            <div className="menu-divider"><hr className="menu-sep"/></div>
                            <div className="nav-modal-item">
                                <button className="nav-modal-btn" onClick={this.props.logoutUser}>
                                    <div className="nav-item-label">
                                        Sign out of <strong>Team Rocket</strong>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

export default NavTeamHeader;