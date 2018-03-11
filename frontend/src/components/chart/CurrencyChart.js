import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import './CurrencyChart.css';

class CurrencyChart extends Component {
    render() {
        if (!this.props.rates) {
            return null;
        }
        let data = {
            labels: this.props.dates,
            datasets: [{
                label: this.props.currency,
                data: this.props.rates,
                lineTension: 0,
                borderColor: '#751430',
                backgroundColor: 'rgba(240, 240, 240, 0.3)',
                pointBackgroundColor: 'white'
            }]
        };
        return (
            <div className='currency-chart'>
                <Line data={data} />
            </div>
        );
    }

    // See https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
    componentDidMount() {
        if (!this.props.rates) {
            this.props.onLoad();
        }
    }
}

CurrencyChart.propTypes = {
    currency: PropTypes.string.isRequired,
    dates: PropTypes.arrayOf(PropTypes.string),
    rates: PropTypes.arrayOf(PropTypes.number),
    onLoad: PropTypes.func.isRequired
};

export default CurrencyChart;