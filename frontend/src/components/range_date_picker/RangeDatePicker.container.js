import { connect } from 'react-redux';
import { changeDate } from '../../redux/modules/filter';
import RangeDatePicker from './RangeDatePicker';

const mapStateToProps = state => {
    return {
        startDate: state.filter.startDate,
        endDate: state.filter.endDate
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDatesChange: (range) => {
            dispatch(changeDate(range));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RangeDatePicker);