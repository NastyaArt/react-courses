import { connect } from 'react-redux';
import CurrencyChart from './CurrencyChart';

const mapStateToProps = state => {
    let currency = state.filter.selectedCurrency;

    if (state.rates.ticks) {
        let dates = [];
        let rates = [];
        state.rates.ticks.forEach((tick) => {
            dates.push(tick['Date']);
            rates.push(tick[currency]);
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



export default connect(mapStateToProps)(CurrencyChart);