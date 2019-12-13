import { combineReducers } from "redux";
import sessionErrorsReducer from './session_errors_reducer';
import channelErrorsReducer from './channel_errors_reducer';
import messageErrorsReducer from './message_errors_reducer';
import membershipErrorsReducer from './membership_errors_reducer';

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    channel: channelErrorsReducer,
    message: messageErrorsReducer,
    membership: membershipErrorsReducer
});

export default errorsReducer;