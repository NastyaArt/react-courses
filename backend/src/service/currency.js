var fetch = require('node-fetch');
var Promise = require('promise');
var moment = require('moment');
var sendMessage = require('../wsServer').sendMessage;

const CURRENCIES = {
    'USD': 145,
    'EUR': 292,
    'RUB': 298
};

const TIMEOUTS = {
    'USD': 1000,
    'EUR': 3000,
    'RUB': 10000
};

function getRates(currency, dateFrom, dateTo) {
    var code = CURRENCIES[currency];
    if (code == null) {
        return new Promise(function (resolve, reject) {
            reject('Invalid currency ' + currency);
        })
    }

    return new Promise(function (resolve) {
        // Just for sample slow down rates loading
        setTimeout(resolve, TIMEOUTS[currency]);
    })
        .then(function () {
            return fetch('http://www.nbrb.by/API/ExRates/Rates/Dynamics/' + code + '?startDate=' + dateFrom + '&endDate=' + dateTo)
                .then(function (response) {
                    return response.json();
                });
        });
}

function getCurrencyRatesCSV(currencies, dateFrom, dateTo, clientId) {
    var total = currencies.length;
    var done = 0;
    sendProgress(clientId, done, total);

    var promises = [];
    currencies.forEach(function (currency) {
        promises.push(getRates(currency, dateFrom, dateTo).then(function (rates) {
            done++;
            sendProgress(clientId, done, total);
            var data = {};
            return rates.map(rate => ({ date: rate.Date.split('T')[0], cur: rate.Cur_OfficialRate }))
        }));
    });

    return Promise.all(promises).then(function (results) {
        sendProgress(clientId, null, null);

        var csv = 'Date,' + currencies.join(',') + '\n';

        results[0].map((r, i) => {
            csv += r.date + ',' + results.map(function (result) {
                return result[i].cur;
            }).join(',') + '\n';
        })
        return csv;
    });
}

function sendProgress(clientId, done, total) {
    sendMessage(clientId, {
        type: 'progress',
        payload: {
            done: done,
            total: total
        }
    });
}

module.exports = {
    getCurrencyRatesCSV: getCurrencyRatesCSV,
    getRates: getRates
};