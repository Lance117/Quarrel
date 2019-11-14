import React from "react";
import PrimaryFooter from './primary_footer'
import Message from './message'

const PrimaryView = () => (
    <div className="workspace-primary">
        <div className="primary-contents">
            <Message body={'Hello, World!'}/>
            <Message body={'i need help'}/>
        </div>
        <PrimaryFooter />
    </div>
)

export default PrimaryView;