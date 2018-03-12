import { handleActions, createAction } from 'redux-actions';

//- Actions
export const changeTab = createAction('TAB_CHANGE');

//- State
const initialState = {
    currentTab: 'chart'
};

//- Reducers
export default handleActions({
    TAB_CHANGE: (state, action) => {
        return { ...state, currentTab: action.payload };
    }
}, initialState);