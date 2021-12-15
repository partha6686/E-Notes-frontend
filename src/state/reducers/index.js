import { combineReducers } from "redux";
import notesReducer from './notesReducer';
import alertReducer from './alertReducer';

const reducers = combineReducers({
    notes: notesReducer,
    alert: alertReducer
})

export default reducers;