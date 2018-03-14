import { connect } from 'react-redux';
import { checkCurrency } from '../../redux/modules/filter';
import Multiselect from './Multiselect';

const currencies = ['USD', 'EUR', 'RUB'];

const mapStateToProps = state => {
    return {
        options: currencies,
        selectedOptions: state.filter.selectedTableCurrencies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheck: (currency) => {
            dispatch(checkCurrency(currency));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiselect);