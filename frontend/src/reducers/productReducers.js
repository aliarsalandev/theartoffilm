const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  //
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  //
  PRODUCT_DIRECTOR_LIST_REQUEST,
  PRODUCT_DIRECTOR_LIST_SUCCESS,
  PRODUCT_DIRECTOR_LIST_FAIL,
  //
  PRODUCT_CAST_LIST_REQUEST,
  PRODUCT_CAST_LIST_SUCCESS,
  PRODUCT_CAST_LIST_FAIL,
  //
  PRODUCT_ARTIST_LIST_REQUEST,
  PRODUCT_ARTIST_LIST_SUCCESS,
  PRODUCT_ARTIST_LIST_FAIL,
  //
  PRODUCT_ORIGIN_LIST_REQUEST,
  PRODUCT_ORIGIN_LIST_SUCCESS,
  PRODUCT_ORIGIN_LIST_FAIL,
  //
  PRODUCT_FORMAT_LIST_REQUEST,
  PRODUCT_FORMAT_LIST_SUCCESS,
  PRODUCT_FORMAT_LIST_FAIL,
  //
  PRODUCT_ROLLEDFOLDED_LIST_REQUEST,
  PRODUCT_ROLLEDFOLDED_LIST_SUCCESS,
  PRODUCT_ROLLEDFOLDED_LIST_FAIL,
  //

  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET,
} = require('../constants/productConstants');

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCategoryListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDirectorListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_DIRECTOR_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_DIRECTOR_LIST_SUCCESS:
      return { loading: false, directors: action.payload };
    case PRODUCT_DIRECTOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCastListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CAST_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CAST_LIST_SUCCESS:
      return { loading: false, casts: action.payload };
    case PRODUCT_CAST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productArtistListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_ARTIST_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_ARTIST_LIST_SUCCESS:
      return { loading: false, artists: action.payload };
    case PRODUCT_ARTIST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productOriginListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_ORIGIN_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_ORIGIN_LIST_SUCCESS:
      return { loading: false, origins: action.payload };
    case PRODUCT_ORIGIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productFormatListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_FORMAT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_FORMAT_LIST_SUCCESS:
      return { loading: false, formats: action.payload };
    case PRODUCT_FORMAT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productRolledFoldedListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_ROLLEDFOLDED_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_ROLLEDFOLDED_LIST_SUCCESS:
      return { loading: false, rolledFoldeds: action.payload };
    case PRODUCT_ROLLEDFOLDED_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
