import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Multiselect.css';
import SettingsIcon from './SettingsIcon'

class Multiselect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptions: props.selectedOptions,
            open: false
        };

        this.renderOption = this.renderOption.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.close = this.close.bind(this);
        this.checkOption = this.checkOption.bind(this);
        this.setMultiselectElement = this.setMultiselectElement.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    setMultiselectElement(node) {
        this.multiselectElement = node;
    }

    handleClickOutside(event) {
        if (this.multiselectElement && !this.multiselectElement.contains(event.target)) {
            this.close();
        }
    }

    checkOption(option) {
        this.props.onCheck(option);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedOptions: nextProps.selectedOptions
        });
    }

    render() {
        return (
            <div tabIndex="-1" ref={this.setMultiselectElement}
                className={`multiselect ${this.state.open ? "open" : ""}`}>
                <div className="settings" onClick={this.toggleOpen} >
                    <SettingsIcon />
                </div>
                {this.renderOptions()}
            </div>
        );
    }

    renderOptions() {
        if (!this.state.open) {
            return null;
        }
        return (
            <ul className="options">
                {this.props.options.map(this.renderOption)}
            </ul>
        );
    }

    renderOption(option) {
        let status = this.state.selectedOptions.indexOf(option) !== -1 ? true : false;
        return (
            <li key={option}>
                <label >
                    <input type="checkBox" defaultChecked={status} onChange={() => this.checkOption(option)} />
                    {option}
                </label>
            </li >
        );
    }

    componentDidUpdate() {
        if (!this.state.open) {
            this.multiselectElement.blur();
        }
    }

    toggleOpen() {
        this.setState({ open: !this.state.open });
    }

    close() {
        if (this.state.open) {
            this.setState({ open: false });
        }
    }

}

Multiselect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOptions: PropTypes.arrayOf(PropTypes.string),
    onCheck: PropTypes.func.isRequired,
};

export default Multiselect;