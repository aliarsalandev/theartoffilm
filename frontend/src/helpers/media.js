import Axios from "axios";

export const uploadFile = async (file, userInfo) => {
  var FormData = require("form-data");
  var form_data = new FormData();
  form_data.append("media", file);

  const { data } = await Axios.post(`/api/uploads/media`, form_data, {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
  return data;
};

export const sendMessage = async (order, userInfo, message) => {
  const { data } = await Axios.post(
    `/api/messages/${order}/${userInfo._id}`,
    {
      message,
      userInfo,
    },
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
  );
  return data;
};

export const getMessages = async (order, userInfo) => {
  const { data } = await Axios.get(`/api/messages/${order}`, {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });

  return data;
};

export const unreadMessages = async (userInfo) => {
  console.log("unread messages", userInfo);

  const { data } = await Axios.get("/api/messages/unread/all", {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });
  return data;
};

export const unreadOrderMessages = async (order, userInfo) => {
  const { data } = await Axios.get(`/api/messages/unread/${order}`, {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });

  return data;
};
