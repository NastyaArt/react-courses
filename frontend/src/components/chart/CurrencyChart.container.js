import { connect } from 'react-redux';
import CurrencyChart from './CurrencyChart';
import { fetchCurrencyRates } from '../../redux/modules/rates';

let rangeDates = {}

const mapStateToProps = state => {
    let currency = state.filter.selectedCurrency;
    rangeDates = {
        startDate: state.filter.startDate,
        endDate: state.filter.endDate,
        currencySymbol: currency
    }
    if (state.rates.ticks) {
        let dates = [];
        let rates = [];
        state.rates.ticks.forEach((tick) => {
            dates.push(tick['Date'].split('T')[0]);   // "2017-01-01T00:00:00" => ["2017-01-01", "00:00:00"] => "2017-01-01"
            rates.push(tick['Cur_OfficialRate']);
        });
        return {
            currency,
            dates,
            rates
        };
    } else {
        return {
            currency
        };
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    };
};

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        onLoad: () => {
            console.log("lalala", rangeDates);
            dispatchProps.dispatch(fetchCurrencyRates(rangeDates))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CurrencyChart);