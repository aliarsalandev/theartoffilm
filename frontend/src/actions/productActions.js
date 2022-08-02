import Axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  //
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  //
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  //
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  //
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  //
  // PRODUCT_CATEGORY_LIST_SUCCESS,
  // PRODUCT_CATEGORY_LIST_REQUEST,
  // PRODUCT_CATEGORY_LIST_FAIL,
  //
  PRODUCT_DIRECTOR_LIST_SUCCESS,
  PRODUCT_DIRECTOR_LIST_REQUEST,
  PRODUCT_DIRECTOR_LIST_FAIL,
  //
  PRODUCT_CAST_LIST_SUCCESS,
  PRODUCT_CAST_LIST_REQUEST,
  PRODUCT_CAST_LIST_FAIL,
  //
  PRODUCT_ARTIST_LIST_SUCCESS,
  PRODUCT_ARTIST_LIST_REQUEST,
  PRODUCT_ARTIST_LIST_FAIL,
  //
  PRODUCT_ORIGIN_LIST_SUCCESS,
  PRODUCT_ORIGIN_LIST_REQUEST,
  PRODUCT_ORIGIN_LIST_FAIL,
  //
  PRODUCT_FORMAT_LIST_SUCCESS,
  PRODUCT_FORMAT_LIST_REQUEST,
  PRODUCT_FORMAT_LIST_FAIL,
  //
  PRODUCT_CONDITION_LIST_SUCCESS,
  PRODUCT_CONDITION_LIST_REQUEST,
  PRODUCT_CONDITION_LIST_FAIL,
  //
  PRODUCT_ROLLEDFOLDED_LIST_SUCCESS,
  PRODUCT_ROLLEDFOLDED_LIST_REQUEST,
  PRODUCT_ROLLEDFOLDED_LIST_FAIL,
  //
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_DIRECTOR_CREATE_REQUEST,
  PRODUCT_DIRECTOR_CREATE_SUCCESS,
  PRODUCT_DIRECTOR_CREATE_FAIL,
  PRODUCT_CAST_CREATE_REQUEST,
  PRODUCT_CAST_CREATE_SUCCESS,
  PRODUCT_CAST_CREATE_FAIL,
  PRODUCT_ARTIST_CREATE_REQUEST,
  PRODUCT_ARTIST_CREATE_SUCCESS,
  PRODUCT_ARTIST_CREATE_FAIL,
} from "../constants/productConstants";

export const listProducts =
  ({
    pageNumber = 1,
    seller = "",
    name = "",
    // category = '',
    directors = [],
    casts = [],
    artists = [],
    origin = "",
    format = "",
    condition = "",
    rolledFolded = "",
    order = "",
    min = 0,
    max = 0,
    rating = 0,
  }) =>
    async (dispatch) => {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });
      try {
        if (seller === "") {
          const { data } = await Axios.get(
            // &category=${category}
            `/api/products?pageNumber=${pageNumber}&name=${name}&directors=${directors.name}&casts=${casts.name}&artists=${artists.name}&origin=${origin}&format=${format}&condition=${condition}&rolledFolded=${rolledFolded}&min=${min}&max=${max}&order=${order}`
          );
          dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        } else {
          console.log("seller", seller);
          const { data } = await Axios.get(
            // &category=${category}
            `/api/products/seller/${seller}?pageNumber=${pageNumber}`
          );
          dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        }
      } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
      }
    };

export const searchProducts = (query) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/search?${query}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

// export const listProductCategories = () => async (dispatch) => {
//   dispatch({
//     type: PRODUCT_CATEGORY_LIST_REQUEST,
//   });
//   try {
//     const { data } = await Axios.get(`/api/products/categories`);
//     dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
//   }
// };

export const listProductDirectors = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_DIRECTOR_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/directors`);
    dispatch({ type: PRODUCT_DIRECTOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DIRECTOR_LIST_FAIL, payload: error.message });
  }
};

export const listProductCasts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CAST_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/casts`);
    dispatch({ type: PRODUCT_CAST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CAST_LIST_FAIL, payload: error.message });
  }
};

export const createProductDirectors =
  (director) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DIRECTOR_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        "/api/directors",
        { director },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: PRODUCT_DIRECTOR_CREATE_SUCCESS,
        payload: data.director,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_DIRECTOR_CREATE_FAIL, payload: message });
    }
  };
export const createProductCasts = (cast) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CAST_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/casts`,
      { cast },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CAST_CREATE_SUCCESS,
      payload: data.cast,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CAST_CREATE_FAIL, payload: message });
  }
};

export const listProductArtists = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_ARTIST_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/artists`);
    dispatch({ type: PRODUCT_ARTIST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ARTIST_LIST_FAIL, payload: error.message });
  }
};

export const createProductArtist = (artist) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_ARTIST_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/artists`,
      { artist },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_ARTIST_CREATE_SUCCESS,
      payload: data.artist,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_ARTIST_CREATE_FAIL, payload: message });
  }
};

export const listProductOrigins = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_ORIGIN_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/origins`);
    dispatch({ type: PRODUCT_ORIGIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ORIGIN_LIST_FAIL, payload: error.message });
  }
};

export const listProductFormats = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_FORMAT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/formats`);
    dispatch({ type: PRODUCT_FORMAT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_FORMAT_LIST_FAIL, payload: error.message });
  }
};

export const listProductConditions = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CONDITION_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/conditions`);
    dispatch({ type: PRODUCT_CONDITION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CONDITION_LIST_FAIL, payload: error.message });
  }
};

export const listProductRolledFoldeds = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_ROLLEDFOLDED_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/rolledFoldeds`);
    dispatch({ type: PRODUCT_ROLLEDFOLDED_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ROLLEDFOLDED_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/products",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

export const createReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: PRODUCT_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
    }
  };
