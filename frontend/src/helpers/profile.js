import Axios from "axios";

export const sellersList = async () => {
  const { data } = await Axios.get("/api/users/top-sellers");
  return data;
};
