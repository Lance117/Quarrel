import { combineReducers } from "redux";
import activeChannelReducer from './active_channel_reducer'

const uiReducer = combineReducers({
    activeChannel: activeChannelReducer
});

export default uiReducer;