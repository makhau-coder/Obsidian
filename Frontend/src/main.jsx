import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";

// Layouts
import AuthLayout from "./layouts/AuthLayout.jsx";
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import MerchantLayout from "./layouts/MerchantLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

// Public pages
import LandingPage from "./pages/LandingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Auth pages
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

// Customer pages
import CustomerHomePage from "./pages/customer/HomePage.jsx";
import CartPage from "./pages/customer/CartPage.jsx";
import CustomerProfilePage from "./pages/customer/ProfilePage.jsx";
import RestroPage from "./pages/customer/RestroPage.jsx";
import CustomerOrdersPage from "./pages/customer/OrdersPage.jsx";
import CustomerOrderDetailPage from "./pages/customer/OrderDetailPage.jsx";

// Merchant pages
import MerchantDashboardPage from "./pages/merchant/DashboardPage.jsx";
import MenuPage from "./pages/merchant/MenuPage.jsx";
import MerchantOrdersPage from "./pages/merchant/OrdersPage.jsx";
import MerchantOrderDetailPage from "./pages/merchant/OrderDetailPage.jsx";
import MerchantProfilePage from "./pages/merchant/ProfilePage.jsx";
import RestaurantPage from "./pages/merchant/RestroSettingsPage.jsx";

// Admin pages
import AdminDashboardPage from "./pages/admin/DashboardPage.jsx";
import UsersPage from "./pages/admin/UsersPage.jsx";
import UserDetailPage from "./pages/admin/UserDetailPage.jsx";
import RestrosPage from "./pages/admin/RestrosPage.jsx";
import RestroDetailPage from "./pages/admin/RestroDetailPage.jsx";
import AdminOrdersPage from "./pages/admin/OrdersPage.jsx";
import AdminOrderDetailPage from "./pages/admin/OrderDetailPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Customer */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route path="home" element={<CustomerHomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="profile" element={<CustomerProfilePage />} />
          <Route path="restro/:restroId" element={<RestroPage />} />
          <Route path="orders" element={<CustomerOrdersPage />} />
          <Route path="orders/:orderId" element={<CustomerOrderDetailPage />} />
        </Route>

        {/* Merchant */}
        <Route path="/merchant" element={<MerchantLayout />}>
          <Route path="dashboard" element={<MerchantDashboardPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="orders" element={<MerchantOrdersPage />} />
          <Route path="orders/:orderId" element={<MerchantOrderDetailPage />} />
          <Route path="profile" element={<MerchantProfilePage />} />
          <Route path="restaurant" element={<RestaurantPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:userId" element={<UserDetailPage />} />
          <Route path="restros" element={<RestrosPage />} />
          <Route path="restros/:restroId" element={<RestroDetailPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="orders/:orderId" element={<AdminOrderDetailPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
