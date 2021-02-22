import { SET_WEATHER } from "@store/actions/weather";

const initialState = {
  weatherData: null,
};

function loader(state = initialState, action) {
  switch (action.type) {
    case SET_WEATHER:
      return {
        ...state,
        weatherData: action.payload
      }
    default: return state;
  }
}

export default loader;
