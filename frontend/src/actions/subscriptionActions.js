import Axios from "axios";
import {
  SUBSCRIPTION_CREATE_FAIL,
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
  SUBSCRIPTION_DELETE_FAIL,
  SUBSCRIPTION_DELETE_REQUEST,
  SUBSCRIPTION_DELETE_SUCCESS,
  SUBSCRIPTION_DETAILS_FAIL,
  SUBSCRIPTION_DETAILS_REQUEST,
  SUBSCRIPTION_DETAILS_SUCCESS,
  SUBSCRIPTION_LIST_FAIL,
  SUBSCRIPTION_LIST_REQUEST,
  SUBSCRIPTION_LIST_SUCCESS,
  SUBSCRIPTION_UPDATE_FAIL,
  SUBSCRIPTION_UPDATE_REQUEST,
  SUBSCRIPTION_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const createSubscription =
  ({ name, monthPrice, yearPrice, products, currency, image, perks }) =>
  async (dispatch, getState) => {
    dispatch({ type: SUBSCRIPTION_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        "/api/subscriptions",
        {
          name,
          monthPrice,
          yearPrice,
          products,
          currency,
          image,
          perks,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: SUBSCRIPTION_CREATE_SUCCESS,
        payload: data.subscription,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SUBSCRIPTION_CREATE_FAIL, payload: message });
    }
  };

export const listSubscriptions = () => async (dispatch) => {
  dispatch({
    type: SUBSCRIPTION_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/subscriptions");
    dispatch({ type: SUBSCRIPTION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SUBSCRIPTION_LIST_FAIL, payload: error.message });
  }
};

export const detailsSubscription = (subscriptionId) => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_DETAILS_REQUEST, payload: subscriptionId });
  try {
    const { data } = await Axios.get(`/api/subscriptions/${subscriptionId}`);
    dispatch({ type: SUBSCRIPTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateSubscription =
  (subscription, id) => async (dispatch, getState) => {
    dispatch({ type: SUBSCRIPTION_UPDATE_REQUEST, payload: subscription });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `/api/subscriptions/${id}`,
        subscription,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: SUBSCRIPTION_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SUBSCRIPTION_UPDATE_FAIL, error: message });
    }
  };
export const deleteSubscription =
  (subscriptionId) => async (dispatch, getState) => {
    dispatch({ type: SUBSCRIPTION_DELETE_REQUEST, payload: subscriptionId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await Axios.delete(`/api/subscription/${subscriptionId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: SUBSCRIPTION_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SUBSCRIPTION_DELETE_FAIL, payload: message });
    }
  };
