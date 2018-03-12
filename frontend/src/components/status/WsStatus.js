import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './WsStatus.css';
import spinner from './spinner.svg';

class WsStatus extends Component {
    render() {
        switch (this.props.status) {
            case 'connected':
                return (
                    <div className="ws-status material-icons connected" title="connected">check_circle</div>
                );

            case 'reconnecting':
                return (
                    <div className="ws-status reconnecting">
                        <img src={spinner} alt="Reconnecting"/>
                    </div>
                );

            case 'disconnected':
                return (
                    <div className="ws-status material-icons disconnected"
                         title="Disconnected. Click to reconnect."
                         onClick={this.props.onReconnect}>error</div>
                );

            default:
                return null;
        }
    }
}

WsStatus.propTypes = {
    status: PropTypes.oneOf(['connected', 'disconnected', 'reconnecting']),
    onReconnect: PropTypes.func.isRequired
};

export default WsStatus;