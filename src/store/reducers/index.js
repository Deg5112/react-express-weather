import { combineReducers } from "redux";
import loader from "@store/reducers/loader";
import weather from "@store/reducers/weather";

export default combineReducers({ loader, weather });
