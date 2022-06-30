import { combineReducers } from "redux";
import auth from "./auth";
import note from "./note";

const reducer = combineReducers({auth,note});

export default reducer;