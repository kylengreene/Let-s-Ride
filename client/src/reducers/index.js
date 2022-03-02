import clubs from "./clubs";
import rideReducer from "./rideReducer";
import {combineReducers} from "redux";

const reducers = combineReducers({
    clubs,
    rideReducer
});

export default reducers;