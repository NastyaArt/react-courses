import { connect } from 'react-redux';
import { changeDate } from '../../redux/modules/filter';
import RangeDatePicker from './RangeDatePicker';
import { fetchCurrencyRates } from '../../redux/modules/rates';

const CURRENCIES = ['USD', 'EUR', 'RUB'];
let rangeDates = {}

const mapStateToProps = state => {
    rangeDates = {
        startDate: state.filter.startDate,
        endDate: state.filter.endDate,
        currencies: CURRENCIES
    }
    return {
        startDate: state.filter.startDate,
        endDate: state.filter.endDate
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDatesChange: (range) => {
            dispatch(changeDate(range));
        },
        onLoad: () => {
            dispatch(fetchCurrencyRates(rangeDates));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RangeDatePicker);