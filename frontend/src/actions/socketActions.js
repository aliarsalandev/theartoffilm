import { NOTIFICATION_RECEIVED } from "../constants/userConstants";

export const notifyUser = () => async (dispatch) => {
  dispatch({ type: NOTIFICATION_RECEIVED, payload: { received: true } });
};
