import { combineReducers } from 'redux';
import users from './users_reducer';
import site from './site_reducer';
import notifications from './notification_reducer';

const appReducers = combineReducers({
    users,
    site,
    notifications
});

export default appReducers;