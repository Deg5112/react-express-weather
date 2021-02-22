import { TOGGLING_LOADER } from "@store/actions/loader";

const initialState = {
  showLoader: false,
};

function loader(state = initialState, action) {
  console.log('loader!')
  switch (action.type) {
    case TOGGLING_LOADER:
      return {
        ...state,
        showLoader: action.payload
      }
    default: return state;
  }
}

export default loader;
