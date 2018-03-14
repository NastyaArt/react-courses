import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import './Table.css';

class Table extends Component {
    render() {
        if (!this.props.rates) {
            return null;
        }
        return (
            <div className='table'>
                <ReactDataGrid
                    columns={[{ key: "Date", name: "Date" }, { key: this.props.currency, name: this.props.currency }]}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.dates.length}
                />
            </div>
        );
    }

    componentDidMount() {
        if (!this.props.rates) {
            this.props.onLoad();
        }
    }

    rowGetter = (i) => {
        const rate = { "Date": this.props.dates[i], [this.props.currency]: this.props.rates[i] };
        return rate;
    }

};

Table.propTypes = {
    currency: PropTypes.string.isRequired,
    dates: PropTypes.arrayOf(PropTypes.string),
    rates: PropTypes.arrayOf(PropTypes.number),
    onLoad: PropTypes.func.isRequired
};

export default Table;