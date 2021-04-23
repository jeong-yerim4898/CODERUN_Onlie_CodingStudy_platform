import { combineReducers } from 'redux';
import user from './user_reducer';
import { LOGOUT_USER } from '../_actions/types';
import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
    //user
    user,
});

const rootReducer = (state, action) => {
    console.log(action.type);
    if (action.type === LOGOUT_USER) {
        Object.keys(state).forEach(key => {
            storage.removeItem(`${key}`);
        });
        console.log(Object);
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
