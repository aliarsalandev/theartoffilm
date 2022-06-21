import Axios from "axios";

export const siteSettings = async () => {
  const { data } = await Axios.get(`/api/settings`, {
    headers: {},
  });
  return data;
};

export const updateSettings = async (
  { commission, stripe_private_key, site_logo, site_favicon, site_keywords },
  userInfo
) => {
  const { data } = await Axios.put(
    `/api/settings`,
    {
      commission: parseFloat(commission),
      stripe_private_key,
      site_logo,
      site_favicon,
      site_keywords,
    },
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
  );
  return data;
};
