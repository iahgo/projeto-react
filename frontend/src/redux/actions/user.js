import * as actionTypes from './actionsTypes';

export const saveEmail = (email) => ({
  type: actionTypes.SAVE_EMAIL,
  payload: email,
});

export const saveUser = (user) => ({
  type: actionTypes.SAVE_USER,
  payload: user,
});

const userActions = {
  saveEmail,
  saveUser,
};

export default userActions;