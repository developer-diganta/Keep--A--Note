import {createStore} from "redux";

import reducer from "../reducers/index";

export const store = createStore(reducer,
        typeof window === "object" &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    );

