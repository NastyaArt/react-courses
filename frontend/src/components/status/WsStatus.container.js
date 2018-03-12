import {connect} from 'react-redux';
import WsStatus from './WsStatus';
import {getWsStatusString, service} from '../../redux/modules/ws';

const mapStateToProps = state => ({
    status: getWsStatusString(state)
});

const mapDispatchToProps = () => ({
    onReconnect: () => service.reconnect()
});

export default connect(mapStateToProps, mapDispatchToProps)(WsStatus);