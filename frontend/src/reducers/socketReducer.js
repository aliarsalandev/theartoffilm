import { NOTIFICATION_RECEIVED } from "../constants/userConstants";

export const socketReducer = (state = { received: false }, action) => {
  switch (action.type) {
    case NOTIFICATION_RECEIVED:
      return { ...state, received: true };
    default:
      return state;
  }
};
