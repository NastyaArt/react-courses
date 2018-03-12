import { connect } from 'react-redux';
import { changeTab } from '../../redux/modules/tabs_switcher';
import Tabs from './Tabs';

const mapStateToProps = state => {
    console.log(state);
    return {
        currentTab: state.tabs_switcher.currentTab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTabChange: (tab) => {
            dispatch(changeTab(tab));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);