/* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Home from "./pages/Home";
import About from "./pages/About";
import BookTable from "./pages/BookTable";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import "./App.css";
import Orders from "./pages/Orders";
import Dashboard from "./pages/admin/home/DashBoard";
import ProductList from "./pages/admin/products/Products";
import AddProduct from "./pages/admin/products/AddProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import Category from "./pages/admin/products/category/Category";
import Catering from "./pages/admin/catering/Catering";
import BlogList from "./pages/admin/blogs/Blogs";
import AddBlog from "./pages/admin/blogs/AddBlog";
import EditBlog from "./pages/admin/blogs/EditBlog";
import Login from "./pages/authentication/Login";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import ForgotPassword from "./pages/user/ForgotPassword";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import SiteConfig from "./pages/admin/configuration/SiteConfig";
import SiteConfigBanner from "./components/siteconfig/Banner";
import SiteConfigAbout from "./components/siteconfig/About.jsx";
import Store from "./redux/store.js";
import { getAllCategories } from "./redux/actions/category.js";
import { getPublishedProducts } from "./redux/actions/product.js";
import SiteConfigMenu from "./components/siteconfig/Menu.jsx";
import SiteConfigServices from "./components/siteconfig/SiteConfigServices.jsx";
import SiteConfigDelivery from "./components/siteconfig/Delivery.jsx";
import SiteConfigHeader from "./components/siteconfig/Header.jsx";
import { getAllSiteConfig } from "./redux/actions/siteConfig.js";
import ActivationPage from "./pages/user/ActivationPage.jsx";
import AdminForgotPassword from "./pages/authentication/AdminForgetPassword.jsx";
import CheckOut from "./pages/Checkout.jsx";
import OrderPlaced from "./pages/OrderPlaced.jsx";
import { loadSeller, loadUser } from "./redux/actions/user";
import CateringMain from "./pages/Catering.jsx";
import CouponsList from "./pages/admin/coupons/CouponsList.jsx";
import SellerProtectedRoute from "./ProtectedRoutes/SellerProtectedRoute.jsx";
import { server } from "./server.js";
import axios from "axios";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import PendingOrders from "./pages/Orders/PendingOrders.jsx";
import DeliveredOrders from "./pages/Orders/DeliveredOrders.jsx";
import ShippedOrders from "./pages/Orders/ShippedOrders.jsx";
import OrderDetails from "./pages/Orders/OrderDetails.jsx";
import NewsLetter from "./pages/NewsLetter.jsx";
import ProfilePage from "./pages/user/ProfilePage.jsx";
import OrdersPageProfile from "./pages/user/OrdersPageProfile.jsx";
import ContactDetailsPage from "./pages/user/ContactDetailsPage.jsx";
import UserSingleOrderDetails from "./pages/user/UserSingleOrderDetails.jsx";
import CollabarationImagesConfig from "./components/siteconfig/CollabarationImagesConfig.jsx";
import FooterConfig from "./components/siteconfig/FooterConfig.jsx";
import Testimonials from "./components/siteconfig/Testimonials.jsx";
import Services from "./pages/Services.jsx";

function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    Store.dispatch(getAllSiteConfig());
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    // Store.dispatch(getAllEvents());
    Store.dispatch(getAllCategories());
    Store.dispatch(getPublishedProducts());
    // Store.dispatch(getAllProducts());
    // myAction()
    // setTimeout(() => {
    //   Store.dispatch(getAllProducts());
    // }, [500])
    getStripeApikey();
  }, []);

  return (
    <Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            position: "relative",
            top: "80px",
          },
        }}
      />

      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route path="*" element={<div></div>} />
        <Route
          exact
          path="/admin"
          element={
            <SellerProtectedRoute>
              <Dashboard />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/products"
          element={
            <SellerProtectedRoute>
              <ProductList />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/add-product"
          element={
            <SellerProtectedRoute>
              <AddProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/products/:edit"
          element={
            <SellerProtectedRoute>
              <EditProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/category"
          element={
            <SellerProtectedRoute>
              <Category />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin-catering"
          element={
            <SellerProtectedRoute>
              <Catering />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin-blogs"
          element={
            <SellerProtectedRoute>
              <BlogList />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/add-blogs"
          element={
            <SellerProtectedRoute>
              <AddBlog />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin-blogs/:edit"
          element={
            <SellerProtectedRoute>
              <EditBlog />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <SellerProtectedRoute>
              <Orders />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/pending-orders"
          element={
            <SellerProtectedRoute>
              <PendingOrders />
            </SellerProtectedRoute>
          }
        />
        {/* <Route
          exact
          path="/shipped-orders"
          element={
            <SellerProtectedRoute>
              <ShippedOrders />
            </SellerProtectedRoute>
          }
        /> */}
        <Route
          exact
          path="/delivered-orders"
          element={
            <SellerProtectedRoute>
              <DeliveredOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/order-details/:id"
          element={
            <SellerProtectedRoute>
              <OrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/create-newsletter"
          element={
            <SellerProtectedRoute>
              <NewsLetter />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config"
          element={
            <SellerProtectedRoute>
              <SiteConfig />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config/banner"
          element={
            <SellerProtectedRoute>
              <SiteConfigBanner />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config/about"
          element={
            <SellerProtectedRoute>
              <SiteConfigAbout />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config/menu"
          element={
            <SellerProtectedRoute>
              <SiteConfigMenu />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config/services"
          element={
            <SellerProtectedRoute>
              <SiteConfigServices />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config/delivery"
          element={
            <SellerProtectedRoute>
              <SiteConfigDelivery />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config/testimonials"
          element={
            <SellerProtectedRoute>
              <Testimonials />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config/collabarators"
          element={
            <SellerProtectedRoute>
              <CollabarationImagesConfig />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config/header"
          element={
            <SellerProtectedRoute>
              <SiteConfigHeader />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/site-config/footer"
          element={
            <SellerProtectedRoute>
              <FooterConfig />
            </SellerProtectedRoute>
          }
        />
        <Route
          exact
          path="/coupons"
          element={
            <SellerProtectedRoute>
              <CouponsList />
            </SellerProtectedRoute>
          }
        />
        <Route exact path="/locations" element={<div>LOcations</div>} />
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <UserSingleOrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderspage"
          element={
            <ProtectedRoute>
              <OrdersPageProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contactDetailsPage"
          element={
            <ProtectedRoute>
              <ContactDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/user-login" element={<UserLogin />} />
        <Route exact path="/user-register" element={<UserRegister />} />

        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route
          exact
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          exact
          path="/admin-forgot-password"
          element={
            <SellerProtectedRoute>
              <AdminForgotPassword />
            </SellerProtectedRoute>
          }
        />

        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/services" element={<Services 
          title="Services"
        />} />
        <Route exact path="/catering" element={<CateringMain />} />
        <Route exact path="/book-table" element={<BookTable />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/order-placed" element={<OrderPlaced />} />
        <Route exact path="/menu/:id" element={<ProductDetails />} />
        <Route exact path="/blog/:slug" element={<BlogDetails />} />
        <Route exact path="/contact-us" element={<Contact />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
