import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  email: '',
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case actionTypes.SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;