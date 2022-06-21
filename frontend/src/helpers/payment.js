import Axios from "axios";
export function CurrencyRates({ onResult, onError }) {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "s7sDrj1bUOBNGgb5pWuMG3KJvELeG5q8");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  fetch(
    "https://api.apilayer.com/fixer/latest?symbols=USD%2CEUR&base=GBP",
    requestOptions
  )
    .then((response) => response.text())
    .then(onResult)
    .catch(onError);
}

export const processCheckout = async (
  currency,
  product_name,
  unit_amount,
  period,
  quantity,
  type = "subscription",
  ref
) => {
  const { data } = await Axios.post(
    "/api/orders/create-checkout-session",
    {
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: product_name,
            },
            unit_amount: +unit_amount.replace(".", ""),
          },
          quantity: +quantity,
        },
      ],
      type,
      period,
      ref,
    },
    { headers: {} }
  );
  return data;
};

export const allowedToPay = async (orderId, shippingPrice, userInfo) => {
  const { data } = await Axios.put(
    `/api/orders/${orderId}/allow-to-pay`,
    {
      shippingPrice,
      allowedToPay: true,
    },
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
  );
  return data;
};

export const paymentStatus = async (session_id, user_id) => {
  const { data } = await Axios.get(
    `/api/orders/payment-status/${session_id}/${user_id}`,
    {
      headers: {},
    }
  );
  return data;
};

export const userSubscription = async (user_id) => {
  const { data } = await Axios.get(`/api/users/${user_id}/subscription`, {
    headers: {},
  });
  return data;
};

export const transferToSeller = async (orderId, userInfo) => {
  const { data } = await Axios.post(
    `/api/orders/transfer`,
    {
      orderId,
    },
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
  );
  return data;
};
