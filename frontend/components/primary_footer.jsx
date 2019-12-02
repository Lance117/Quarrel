import React from "react";

const PrimaryFooter = props => (
    <footer className="primary-footer">
        <div className="msg-input">
            <form>
                <input type="text" className="txt-editor" placeholder={`Message #${props.activeChannel}`}/>
            </form>
        </div>
    </footer>
)

export default PrimaryFooter;