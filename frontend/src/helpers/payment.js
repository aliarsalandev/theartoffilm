import Axios from "axios";
export function CurrencyRates({ onResult, onError }) {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "s7sDrj1bUOBNGgb5pWuMG3KJvELeG5q8");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  try {
    fetch(
      "https://api.apilayer.com/fixer/latest?base=GBP&?symbols=JPY%2CEUR%2CUSD",
      requestOptions
    )
      .then((response) => response.text())
      .then(onResult)
      .catch(onError);
  } catch (error) { }
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
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  // const subtotal = cartItems?.reduce((pv, cv) => pv + cv.price, 0);

  const { data } = await Axios.post(
    "/api/orders/create-checkout-session",
    {
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: type !== "subscription" ? cartItems[0].name : product_name,
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

export const paymentStatus = async (session_id, user_id) => {
  const { data } = await Axios.get(
    `/api/orders/payment-status/${session_id}/${user_id}`,
    {
      headers: {},
    }
  );
  return data;
};

export const stripeBalance = async (userInfo, stripe_account_id) => {
  const { data } = await Axios.post(
    "/api/users/balance",
    {
      stripe_account_id,
    },
    { headers: { Authorization: `Bearer ${userInfo.token}` } }
  );
  const { balance } = data;
  return balance;
};

export const withdrawStripeBalance = async (userInfo, stripe_account_id) => {
  const { data } = await Axios.post(
    "/api/users/withdraw",
    {
      stripe_account_id,
    },
    { headers: { Authorization: `Bearer ${userInfo.token}` } }
  );
  const { payout } = data;
  return payout;
};

export const getPaymentInfo = async (userInfo) => {
  const { data } = await Axios.get(`/api/payment-info/${userInfo.email}`, {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  });
  return data;
};


export const getSellerPaymentInfo = async (email) => {
  const { data } = await Axios.get(`/api/payment-info/${email}`, {
  });
  return data;
};

export const updatePaymentInfo = async (info, userInfo) => {
  const { _id } = userInfo;
  const { data } = await Axios.put(
    `/api/payment-info`,
    {
      ...info,
      user: { id: _id },
    },
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
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
