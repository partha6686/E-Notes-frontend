import { combineReducers } from "redux";
import notesReducer from './notesReducer';
import alertReducer from './alertReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
    notes: notesReducer,
    alert: alertReducer,
    user: userReducer
})

export default reducers;