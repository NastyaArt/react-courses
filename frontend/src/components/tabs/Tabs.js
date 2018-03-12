import React, { Component } from 'react';
import './Tabs.css';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: props.currentTab
        };
        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange(e) {
        console.log(e, e.target.id);

        this.props.onTabChange(e.target.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentTab: nextProps.currentTab
        });
    }

    getTabs() {
        var ids = ['Graph', 'Table'];
        return ids.map(id => <div key={id} className={`tab ${id === this.state.currentTab && "active"}`} id={id} onClick={this.onTabChange} >{id}</div>)
    }

    render() {
        return (
            <div className='tabs'>
                {this.getTabs()}
            </div>
        );
    }

};

export default Tabs;