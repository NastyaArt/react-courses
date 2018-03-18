import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import './Table.css';

class Table extends Component {
    render() {
        if (!this.props.selectedCurrencies || !this.props.rates) {
            return null;
        }
        return (
            <div className='table'>
                <ReactDataGrid
                    columns={this.getColumns()}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.rates.length}
                    minHeight={470}
                />
            </div>
        );
    }

    getColumns() {
        return [
            { key: "Date", name: "Date" },
            ...this.props.selectedCurrencies.map(el => ({ key: el, name: el }))
        ];
    }

    rowGetter = (i) => {
        const rate = { ...this.props.rates[i] };
        return rate;
    }

};

Table.propTypes = {
    selectedCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    rates: PropTypes.arrayOf(PropTypes.object)
};

export default Table;