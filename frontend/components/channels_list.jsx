import React from 'react'

const ChannelsList = props => {
    return (
        <div className="channels-list">
            <div style={{height: '12px'}}></div>
            <div className="sidebar-section-heading">
                <button className="channel-section-heading">Channels</button>
            </div>
            <div style={{height: '26px'}}>
                <span className="channel-name"># channel placeholder</span>
            </div>
        </div>
    )
}

export default ChannelsList;