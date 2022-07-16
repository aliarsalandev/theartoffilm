import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchScreen from "./screens/SearchScreen";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SellersScreen from "./screens/SellersScreen";
import AdvertiseWithUs from "./screens/AdvertiseWithUs";
import FAQScreen from "./screens/FAQScreen";
import ContactScreen from "./screens/ContactScreen";
import SubscriptionListScreen from "./screens/SubscriptionListScreen";
import SubscriptionEditScreen from "./screens/SubscriptionEditScreen";
import PricingScreen from "./screens/PricingScreen";
import PaymentSuccess from "./screens/PaymentSuccess";
import { UserSubscriptionScreen } from "./screens/UserSubscriptionScreen";
import SettingScreen from "./screens/SettingScreen";
import AboutUS from "./screens/AboutUS";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import Terms from "./screens/Terms";
import BlogPage from "./screens/BlogPage";
import PosterGradingCategoriesPage from "./screens/PosterGradingCategoriesPage";
import GrahamHumpreys from "./screens/GrahamHumpreys";
import WhyFilmPosters from "./screens/WhyFilmPosters";
import PaymentScreen from "./screens/PaymentScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    window.onload = function () {
      console.log("window loaded");
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    };
    return () => {};
  }, []);

  return (
    <BrowserRouter>
      <div className="">
        <Header />
        <main className={""}>
          <Routes>
            <Route path="/seller/:id" element={<SellerScreen />}></Route>
            <Route path="/sellers" element={<SellersScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route
              path="/product/:id"
              element={<ProductScreen />}
              exact
            ></Route>
            <Route
              path="/product/:id/edit"
              element={<ProductEditScreen />}
              exact
            ></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            {/* <Route path="/payment" element={<PaymentMethodScreen />}></Route> */}
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
              path="/orderhistory"
              element={<OrderHistoryScreen />}
            ></Route>
            <Route
              path="/payment/success/session/:id"
              element={<PaymentSuccess />}
            ></Route>
            <Route path="/shop/name" element={<SearchScreen />} exact></Route>
            <Route
              path="/shop/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/shop/category/:category"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/shop/category/:category/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/shop/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <MapScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/subscriptions/:id/edit"
              element={
                <AdminRoute>
                  <SubscriptionEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <AdminRoute>
                  <SettingScreen />
                </AdminRoute>
              }
            />
            <Route
              path={"/payment"}
              element={
                <PrivateRoute>
                  <PaymentScreen />
                </PrivateRoute>
              }
            />
            <Route
              path={"/user/subscriptions"}
              element={<UserSubscriptionScreen />}
            />
            <Route
              path="/subscriptions/create"
              element={
                <AdminRoute>
                  <SubscriptionEditScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/subscriptions"
              element={
                <AdminRoute>
                  <SubscriptionListScreen />
                </AdminRoute>
              }
            />
            <Route path="/page/subscriptions" element={<PricingScreen />} />

            <Route
              path="/productlist/pageNumber/:pageNumber"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/userlist"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/productlist/seller"
              element={
                <SellerRoute>
                  <ProductListScreen />
                </SellerRoute>
              }
            />
            <Route
              path="/orderlist/seller"
              element={
                <SellerRoute>
                  <OrderListScreen />
                </SellerRoute>
              }
            />
            <Route path="/" element={<HomeScreen />} exact></Route>

            <Route
              path="/advertise-with-us"
              element={<AdvertiseWithUs />}
            ></Route>

            <Route path="/blog-page" element={<BlogPage />}></Route>
            <Route path="/grahamhumpreys" element={<GrahamHumpreys />}></Route>
            <Route
              path={"/why-film-posters"}
              element={<WhyFilmPosters />}
            ></Route>

            <Route path="/about-us" element={<AboutUS />}></Route>

            <Route path="/faq" element={<FAQScreen />}></Route>
            <Route path="/privacy" element={<PrivacyPolicy />}></Route>
            <Route
              path="/poster-grading-categories"
              element={<PosterGradingCategoriesPage />}
            ></Route>

            <Route path="/terms" element={<Terms />}></Route>
            <Route path="/contact" element={<ContactScreen />}></Route>
          </Routes>
        </main>
        <div className={"pt-2"}>
          <Footer userInfo={userInfo} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
