export const API_HOST = 'localhost:3001';

const CURRENCIES = {
    'USD': 145,
    'EUR': 292,
    'RUB': 298
};

export class CurrencyRatesApi {
    static fetchCurrencyRates(data) {
        let code = getCurrencyCode(data.currencySymbol); // eslint-disable-line no-unused-vars
        // let startDate = '2017-01-01';
        // let endDate = '2017-01-07';
        let startDate = data.startDate.toISOString();
        let endDate = data.endDate.toISOString();
        //return fetch(`http://www.nbrb.by/API/ExRates/Rates/Dynamics/${code}?startDate=${startDate}&endDate=${endDate}`); // real nbrb server
        return fetch(`http://${API_HOST}/api/rates/?currency=${data.currencySymbol}&dateFrom=${startDate}&dateTo=${endDate}`); // proxy server to show advantages of RxJS switchMap in compare with Promises
    }
}

const getCurrencyCode = (currencySymbol) => {
    return CURRENCIES[currencySymbol];
};