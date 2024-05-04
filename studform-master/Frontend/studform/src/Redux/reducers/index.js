import alertReducer from "./alert";
import changetheState  from "./storeArray";
import {combineReducers} from "redux";

const rootReducer=combineReducers({
    changetheState : changetheState,
    alert: alertReducer,
})

export default rootReducer;