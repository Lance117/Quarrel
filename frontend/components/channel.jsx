import React from 'react'
import { Link } from 'react-router-dom';

function Channel(props) {
    return (
        <div style={{height: '26px'}} className={`active-${props.active}`}>
            <Link to={`/workspace/${props.channel.id}`} style={{textDecoration: 'none'}}>
                <span className={`channel-name active-${props.active}`}>{`# ${props.channel.channel_name}`}</span>
            </Link>
        </div>
    )
}

export default Channel;