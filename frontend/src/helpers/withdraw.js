import Axios from "axios";

export const requestAWithdrawal = async (userInfo, amount, currency) => {
  const { data } = await Axios.post(
    "/api/withdraw",
    {
      user: userInfo._id,
      amount,
      currency,
    },
    { headers: { Authorization: `Bearer ${userInfo.token}` } }
  );
  const { withdraw } = data;
  return withdraw;
};

export const getWithdraws = async (userInfo) => {
  const { data } = await Axios.get(`/api/withdraw/${userInfo?._id}`, {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });
  const { withdraws } = data;
  return withdraws;
};

export const getSellerWithdraws = async (userInfo) => {
  const { data } = await Axios.get(`/api/withdraw`, {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });
  const { withdraws } = data;
  return withdraws;
};

export const updateWithdraw = async (userInfo, status, id) => {
  const { data } = await Axios.put(
    `/api/withdraw/${id}`,
    {
      status,
    },
    { headers: { Authorization: `Bearer ${userInfo.token}` } }
  );
  const { withdraw } = data;
  return withdraw;
};
