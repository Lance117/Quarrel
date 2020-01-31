import React from 'react'
import ReactModal from 'react-modal';
import ReactQuill, { Quill } from 'react-quill';
import NavTeamHeader from './team_header'
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import stringHash from 'string-hash'

export default class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSettings: false,
            showMembers: false,
            showEditTopic: false,
            value: ''
        };
        this.textInput = React.createRef();
        this.handleOpenSettings = this.handleOpenSettings.bind(this);
        this.handleCloseSettings = this.handleCloseSettings.bind(this);
        this.handleOpenMembers = this.handleOpenMembers.bind(this);
        this.handleCloseMembers = this.handleCloseMembers.bind(this);
        this.handleJoinOrLeave = this.handleJoinOrLeave.bind(this);
        this.handleOpenEdit = this.handleOpenEdit.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelChannel = this.handleDelChannel.bind(this);
    }

    handleOpenEdit() {
        this.setState({ showEditTopic: true });
    }

    handleCloseEdit() {
        this.setState({ showEditTopic: false });
    }

    handleOpenSettings(e) {
        this.setState({ showSettings: true });
    }

    handleCloseSettings() {
        this.setState({ showSettings: false });
    }

    handleOpenMembers(e) {
        this.setState({ showMembers: true });
    }

    handleCloseMembers() {
        this.setState({ showMembers: false });
    }

    handleSubmit() {
        this.props.updateChannel({id: this.props.activeChannel.id, topic: this.textInput.current.getEditor().getText().trim()}).then(r => {
            this.handleCloseEdit();
        }), err => {
            console.log(err)
        };
        this.handleCloseEdit();
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleJoinOrLeave(e) {
        e.preventDefault();
        let isMember = this.getMembership();
        if (isMember) {
            $.when(this.props.deleteMembership(isMember)).then(r => {
                this.handleCloseSettings();
                if (this.props.active) window.localStorage.setItem('lastVisited', 1);
                this.props.history.push("1");
            }), err => {
                console.log(err)
            };
        } else {
            this.props.createMembership({user_id: this.props.userId, channel_id: this.props.activeChannel.id}).then(r => {
                this.handleCloseSettings();
            }), err => {
                console.log(err)
            };
        }
    }

    handleDelChannel() {
        this.props.deleteChannel({id: this.props.activeChannel.id}).then(r => {
            this.handleCloseSettings();
            window.localStorage.setItem('lastVisited', 1);
            this.props.history.push("1");
        }), err => {
            console.log(err)
        }
    }

    getMembers() {
        let res = [];
        for (let membership of this.props.memberships) {
            if (membership.channel_id === this.props.activeChannel.id) {
                res.push(this.props.users[membership.user_id])
            }
        }
        res.sort((a,b) => (a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1));
        return res;
    }

    getMembership() {
        for (const membership of this.props.memberships) {
            if (membership.user_id === this.props.userId &&
                membership.channel_id === this.props.activeChannel.id) {
                    return {id: membership.id};
                }
        }
        return null;
    }

    render() {
        if (!this.props.channels[this.props.activeChannel.id]) return null;
        const members = this.getMembers();
        const filteredMembers = members.filter(x => x.username.toLowerCase().search(this.state.value.toLowerCase()) != -1);
        const topic = this.props.channels[this.props.activeChannel.id].topic;

        return (
            <div className="workspace-top-nav">
                <div className="flex-top-nav">
                    <NavTeamHeader currentUser={this.props.currentUser} logoutUser={this.props.logoutUser} avatars={avatars}/> 
                    <div className="nav-channel-header">
                        <div className="channel-title-header">
                            <div className="nav-title">
                                {`# ${this.props.channels[this.props.activeChannel.id].channel_name}`}
                            </div>
                            <div className="nav-title-info">
                                <button className="channel-members-info common-btn" onClick={this.handleOpenMembers}>
                                    <i className="user-icon all-icons"></i>&nbsp;{members.length}
                                </button>
                                <span style={{opacity: '.5', margin: '0 6px', color: '#c6c7c8'}}>|</span>
                                <div className="nav_topic">
                                    <div className="nav_topic_text" onClick={this.handleOpenEdit}>
                                        {!topic && <div className="nav_topic_content">
                                            <i className="all-icons inline-icon pencil_icon" style={{width: '1em'}}></i>
                                            &nbsp;Add a topic
                                        </div>}
                                        {topic && <span className="nav_topic_content">{topic}</span>}
                                    </div>
                                    <button className="common-btn edit_topic" onClick={this.handleOpenEdit}>Edit</button>
                                </div>
                            </div>
                        </div>
                        <div className="nav-buttons">
                            <button className="nav-btn common-btn" onClick={this.handleOpenSettings}>
                                <i className="all-icons settings-icon"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <ReactModal
                    isOpen={this.state.showSettings}
                    contentLabel="Channel settings"
                    onRequestClose={this.handleCloseSettings}
                    shouldCloseOnOverlayClick={true}
                    overlayClassName="popover"
                    style={{
                        content: {
                            top: '46px',
                            left: 'null',
                            right: '15px',
                            position: 'absolute',
                            outline: 'none',
                            transitionDuration: '80ms',
                            borderRadius: 'null',
                            bottom: 'null',
                            border: 'null',
                            background: 'null',
                            overflow: 'null',
                            padding: 'null',
                        }
                    }}
                >
                    <div className="actions-menu" style={{ width: "auto" }}>
                        <div className="nav-modal-item">
                            <button className="nav-modal-btn" onClick={this.handleJoinOrLeave}>
                                <div className="nav-item-label">{`${this.getMembership() ? 'Leave': 'Join'} #${this.props.channels[this.props.activeChannel.id].channel_name}`}</div>
                            </button>
                            {
                                this.props.channels[this.props.activeChannel.id].user_id === this.props.userId &&
                                <button className="nav-modal-btn delete_msg" onClick={this.handleDelChannel}>
                                    <div className="nav-item-label">Delete channel</div>
                                </button>
                            }
                        </div>
                    </div>
                </ReactModal>

                <ReactModal
                    isOpen={this.state.showMembers}
                    contentLabel="Members list"
                    onRequestClose={this.handleCloseMembers}
                    shouldCloseOnOverlayClick={true}
                    overlayClassName="add-channel-popover"
                    className="add-channel-modal"
                >
                    <div className="add-channel-header" style={{color: "#d1d2d3"}}>
                        <div className="members-title">
                            <h1>
                                {`${members.length} ${members.length != 1 ? 'members' : 'member'} in `}
                                <span style={{overflow: 'hidden', textOverflow: 'ellipsis', wordBreak: 'break-all'}}>
                                    #{this.props.channels[this.props.activeChannel.id].channel_name}
                                </span>
                            </h1>
                        </div>
                        <div style={{padding: '0 28px', marginBottom: '20px'}}>
                            <div className='filter-input' style={{height: '36px', fontSize: '15px'}}>
                                <i className="all-icons search-icon" style={{top: '1px'}}></i>
                                <input className="channel-search-input" type="text" placeholder="Search members" onChange={this.handleChange} value={this.state.value}></input>
                                {this.state.value && <div className="reset-input-icon">
                                    <i className="all-icons reset-btn" onClick={() => this.setState({ value: '' })}></i>
                                </div>}
                            </div>
                        </div>
                        <div style={{height: '450px', display: 'flex', flexDirection: 'column'}}>
                            <div className='channel-browser-list-container' style={{position: 'relative'}}>
                                <AutoSizer>
                                    {({ height, width }) => (
                                        <List
                                            height={height}
                                            width={width}
                                            itemCount={filteredMembers.length}
                                            itemSize={60}
                                            itemData={{
                                                members: filteredMembers,
                                            }}
                                        >
                                            {Row}
                                        </List>
                                    )}
                                </AutoSizer> 
                            </div>
                        </div>
                    </div>
                </ReactModal>

                <ReactModal
                    isOpen={this.state.showEditTopic}
                    contentLabel="Edit topic"
                    onRequestClose={this.handleCloseEdit}
                    shouldCloseOnOverlayClick={true}
                    overlayClassName="add-channel-popover c_dialog"
                    className="c_dialog_content"
                >
                    <div className="c_dialog_header">
                        <h1 className="c_dialog_title">Edit channel topic</h1>
                    </div>
                    <ReactQuill
                        className='c_dialog_body'
                        ref={this.textInput}
                        theme={null}
                        handleEnter={this.handleSubmit}
                        modules={{
                            keyboard: {
                                bindings: {
                                    enter: {
                                        key: 13,
                                        handler: this.handleSubmit 
                                    }
                                }
                            }
                        }}
                    />
                    <div className="dialog_footer">
                        <div className="dialog_footer_buttons">
                            <button className="medium_btn c-button dialog_cancel" onClick={this.handleCloseEdit}>Cancel</button>
                            <button className="preview-btn medium_btn c-button" style={{marginLeft: '12px', fontFamily: 'Lato'}} onClick={this.handleSubmit}>
                                Set topic
                            </button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

// helpers
const avatars = [
    'https://ca.slack-edge.com/T03GU501J-UJZAX6WDU-g5e90ac62e9f-72',
    'https://ca.slack-edge.com/T03GU501J-UL2N3LG2X-gf1556aa48ff-72',
    'https://ca.slack-edge.com/T03GU501J-ULUDZ1QKS-g7b70ea0cbae-72',
    'https://ca.slack-edge.com/T03GU501J-UKT0C8SS1-g665db23aba0-72',
    'https://ca.slack-edge.com/T03GU501J-UMHG8Q2NA-g7eee62267eb-72',
    'https://ca.slack-edge.com/T03GU501J-ULNGNK0LC-g5f57353e5f4-72',
    'https://ca.slack-edge.com/T03GU501J-UBVJX8CB1-g59c98ec02a0-48',
    'https://ca.slack-edge.com/T03GU501J-UL4FRHEER-gebe3e59ff06-72',
    'https://ca.slack-edge.com/T03GU501J-ULXV025EG-g9d24e4c4d3d-72',
    'https://ca.slack-edge.com/T03GU501J-UDEMKU2KD-g99e9e862d66-72',
    'https://ca.slack-edge.com/T03GU501J-UPEMSDDF1-g642684ec089-72',
    'https://ca.slack-edge.com/T03GU501J-ULG8PH0F8-g1ff632e59b1-72',
    'https://ca.slack-edge.com/T03GU501J-UM3KRAGQ2-g2ab2756ba7a-72',
    'https://ca.slack-edge.com/T03GU501J-U4PP3VBR8-gb7de446f194-72',
    'https://ca.slack-edge.com/T03GU501J-UPA56QKSS-gc81d3abfcf5-512',
    'https://ca.slack-edge.com/T03GU501J-UH645JECU-gc4364aeb73c-512'
];

const Row = ({ index, style, data }) => {
    return (
        <div className="member-list-thing" key={index} style={style}>
            <button className="common-btn" style={{width: "100%", height: '100%'}}>
                <div className='member-list-item' style={{height: '100%'}}>
                    <div style={{flex: '1', flexShrink: '2'}}>
                        <div style={{minHeight: '36px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <span className='list-avatar all-avatar' style={{height: '36px', lineHeight: '36px', width: '36px'}}>
                                <img className='avatar-img' src={avatars[parseInt(stringHash(data.members[index].username)) % avatars.length]} />
                            </span>
                            <div className='member-list-contents'>
                                <span style={{display: 'flex', alignItems: 'center'}}>
                                    <span style={{marginRight: '4px'}}>
                                        <span style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            wordBreak: 'break-all'
                                        }}
                                        >
                                            <strong>{data.members[index].username}</strong>
                                        </span>
                                    </span>
                                    {!data.members[index].online && <i className="presence_offline inline-icon all-icons"></i>}
                                    {data.members[index].online && <i className="presence-active inline-icon all-icons"></i>}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}
//---------