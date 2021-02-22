/**
 * Main store function
 */
import { createStore, compose } from "redux";
import rootReducer from "./reducers";

export default function(initialState = {}) {
  const enhancers = [];

  if (process.env.NODE_ENV !== "production") {
    window.devToolsExtension && enhancers.push(window.devToolsExtension());
  }

  return createStore(rootReducer, initialState, compose(...enhancers));
}
