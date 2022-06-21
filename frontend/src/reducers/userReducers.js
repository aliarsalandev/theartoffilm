import {
  SELLER_LIST_FAIL,
  SELLER_LIST_REQUEST,
  SELLER_LIST_SUCCESS,
  SUBSCRIPTION_CREATE_FAIL,
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
  SUBSCRIPTION_DELETE_FAIL,
  SUBSCRIPTION_DELETE_REQUEST,
  SUBSCRIPTION_DELETE_RESET,
  SUBSCRIPTION_DELETE_SUCCESS,
  SUBSCRIPTION_DETAILS_FAIL,
  SUBSCRIPTION_DETAILS_REQUEST,
  SUBSCRIPTION_DETAILS_SUCCESS,
  SUBSCRIPTION_LIST_FAIL,
  SUBSCRIPTION_LIST_REQUEST,
  SUBSCRIPTION_LIST_SUCCESS,
  SUBSCRIPTION_UPDATE_FAIL,
  SUBSCRIPTION_UPDATE_REQUEST,
  SUBSCRIPTION_UPDATE_RESET,
  SUBSCRIPTION_UPDATE_SUCCESS,
  USER_ADDRESS_MAP_CONFIRM,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_TOPSELLERS_LIST_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const userListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const sellerListReducer = (
  state = { loading: true, sellers: [] },
  action
) => {
  switch (action.type) {
    case SELLER_LIST_REQUEST:
      return { loading: true };
    case SELLER_LIST_SUCCESS:
      return { loading: false, sellers: action.payload };
    case SELLER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const userTopSellerListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_TOPSELLERS_LIST_REQUEST:
      return { loading: true };
    case USER_TOPSELLERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_TOPSELLERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAddressMapReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADDRESS_MAP_CONFIRM:
      return { address: action.payload };
    default:
      return state;
  }
};

export const subscriptionListReducer = (
  state = { loading: true, subscriptions: [] },
  action
) => {
  switch (action.type) {
    case SUBSCRIPTION_LIST_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_LIST_SUCCESS:
      return { loading: false, ...action.payload };
    case SUBSCRIPTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subscriptionCreateReducer = (
  state = { loading: false, subscription: {} },
  action
) => {
  switch (action.type) {
    case SUBSCRIPTION_CREATE_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_CREATE_SUCCESS:
      return { loading: false, ...action.payload };
    case SUBSCRIPTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subscriptionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_UPDATE_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SUBSCRIPTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIPTION_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const subscriptionDeleteReducer = (
  state = { loading: true, subscription: {} },
  action
) => {
  switch (action.type) {
    case SUBSCRIPTION_DELETE_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SUBSCRIPTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIPTION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const subscriptionDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case SUBSCRIPTION_DETAILS_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_DETAILS_SUCCESS:
      return { loading: false, subscription: action.payload };
    case SUBSCRIPTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
