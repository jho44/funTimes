import {
  ADD_ITEM,
  DELETE_ITEM,
} from './actions';

const INITIAL_STATE = {
  wishList: [],
};

// Complete the three cases below
const reducer = (state = INITIAL_STATE, action) => {
  let newState = {}

  switch (action.type) {
    case ADD_ITEM:
      if (state.wishList === undefined)
        newState.wishList = [action.payload]
      else newState.wishList = [...state.wishList, action.payload]
      return newState;
    case DELETE_ITEM:
      newState = state.wishList.filter(x => x !== action.payload)
      return {
        wishList: newState,
      };
    default:
      return state;
  }
};

export default reducer;