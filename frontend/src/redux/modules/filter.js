import { handleActions, createAction } from 'redux-actions';
import { fetchCurrencyRates } from './rates';
import moment from 'moment';

//- Actions
export const selectCurrency = createAction('CURRENCY_SELECT');
export const changeDate = createAction('DATE_CHANGE');

//- State
const initialState = {
    selectedCurrency: 'USD',
    startDate: moment().subtract(6, "days"),
    endDate: moment()
};

//- Epics
export const filterEpic = (action$, store) => {
    return action$.ofType('CURRENCY_SELECT', 'DATE_CHANGE')
        .map(action => {
            let rangeDates = {
                startDate: store.getState().filter.startDate,
                endDate: store.getState().filter.endDate,
                currencySymbol: store.getState().filter.selectedCurrency
            }
            return fetchCurrencyRates(rangeDates);
        });
};

//- Reducers
export default handleActions({
    CURRENCY_SELECT: (state, action) => {
        return { ...state, selectedCurrency: action.payload };
    },
    DATE_CHANGE: (state, action) => {
        return { ...state, startDate: action.payload.startDate, endDate: action.payload.endDate };
    }
}, initialState);