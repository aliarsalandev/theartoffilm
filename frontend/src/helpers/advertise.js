import Axios from "axios";

export const getAdvertisments = async (userInfo) => {
  try {
    const { data } = await Axios.get("/api/advertise", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createAdvertise = async (userInfo, advertise) => {
  const data = await Axios.post(
    "/api/advertise",
    {
      ...advertise,
    },
    { headers: { Authorization: `Bearer ${userInfo.token}` } }
  );

  return data?.advertise;
};

export const updateAdvertisement = async (userInfo, advertise) => {
  const { data } = await Axios.put(
    `/api/advertise`,
    {
      advertise: advertise,
    },
    { headers: { Authorization: `Bearer ${userInfo.token}` } }
  );

  return data?.advertise;
};

/**
 *
 * @param {*} currency
 * @param {*} advertise
 * @param {*} amount
 * @param {*} ref reference id of an object
 * @returns
 */
export const processAdvertiseCheckout = async (advertisement, user_id) => {
  const { data } = await Axios.post("/api/advertise/create-checkout-session", {
    advertisement,
    user_id,
  });

  return data;
};
