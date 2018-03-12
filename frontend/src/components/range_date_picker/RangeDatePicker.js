import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'
import './RangeDatePicker.css';
import moment from 'moment';

class RangeDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.startDate,
            endDate: props.endDate,
            focusedInput: null,
            startDateId: "start_date",
            endDateId: "end_date"
        };
        this.onDatesChange = this.onDatesChange.bind(this);
    }

    onDatesChange(range) {
        if (range.startDate && range.endDate) {
            this.props.onDatesChange(range);
        }
    }

    isOutsideRange(day) {
        return moment().isBefore(day, 'day');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            startDate: nextProps.startDate,
            endDate: nextProps.endDate
        });
    }

    render() {
        return (
            <div className='date-range-picker'>
                <DateRangePicker
                    startDateId={this.state.startDateId}
                    endDateId={this.state.endDateId}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
                    openDirection="up"
                    isOutsideRange={this.isOutsideRange}
                    firstDayOfWeek={1}
                    displayFormat={"DD/MM/YYYY"}
                />
            </div>
        );
    }

};

export default RangeDatePicker;