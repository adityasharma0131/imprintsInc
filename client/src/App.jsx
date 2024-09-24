import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import SingleCategoryPage from "./pages/SingleCategoryPage";
import AutoScroll from "./components/AutoScroll";
import ScrollToTop from "./components/ScrollToTop";
import WhatsaapButton from "./components/WhatsaapButton";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import ProductOperation from "./pages/ProductOperation";
import ClientImg from "./pages/ClientImg";
import UserOperation from "./pages/UserOperation";
import ContactOperation from "./pages/ContactOperation";
import SocialsOperation from "./pages/SocialsOperation";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import AddLogo from "./pages/AddLogo";
import AddUser from "./pages/AddUser";

// Wrapper for client-side pages (with Header and Footer)
const ClientWrapper = ({ children }) => (
  <>
    <Header />
    {children}
    <WhatsaapButton phoneNumber="1212121212121" />
    <Footer />
  </>
);

// Wrapper for admin-side pages (with Sidebar only)
const AdminWrapper = ({ children }) => (
  <>
    <Sidebar />
    {children}
  </>
);

const AppContent = () => {
  return (
    <div>
      <AutoScroll />

      <Routes>
        {/* Public routes wrapped in ClientWrapper */}
        <Route
          path="/"
          element={
            <ClientWrapper>
              <Home />
            </ClientWrapper>
          }
        />
        <Route
          path="/categories/:catName"
          element={
            <ClientWrapper>
              <CategoryPage />
            </ClientWrapper>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <ClientWrapper>
              <SingleCategoryPage />
            </ClientWrapper>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <ClientWrapper>
              <ProductPage />
            </ClientWrapper>
          }
        />
        <Route
          path="/admin-login"
          element={
            <ClientWrapper>
              <AdminLogin />
            </ClientWrapper>
          }
        />

        {/* Admin dashboard route wrapped in AdminWrapper */}
        <Route
          path="/dashboard"
          element={
            <AdminWrapper>
              <Dashboard />
            </AdminWrapper>
          }
        />
        <Route
          path="/product-operation"
          element={
            <AdminWrapper>
              <ProductOperation />
            </AdminWrapper>
          }
        />
        <Route
          path="/client-operation"
          element={
            <AdminWrapper>
              <ClientImg />
            </AdminWrapper>
          }
        />
        <Route
          path="/user-operation"
          element={
            <AdminWrapper>
              <UserOperation />
            </AdminWrapper>
          }
        />
        <Route
          path="/contact-operation"
          element={
            <AdminWrapper>
              <ContactOperation />
            </AdminWrapper>
          }
        />
        <Route
          path="/social-operation"
          element={
            <AdminWrapper>
              <SocialsOperation />
            </AdminWrapper>
          }
        />
        <Route
          path="/product-operation/add-category"
          element={
            <AdminWrapper>
              <AddCategory />
            </AdminWrapper>
          }
        />
        <Route
          path="/product-operation/add-product"
          element={
            <AdminWrapper>
              <AddProduct />
            </AdminWrapper>
          }
        />
        <Route
          path="/client-operation/add-logo"
          element={
            <AdminWrapper>
              <AddLogo />
            </AdminWrapper>
          }
        />

        <Route
          path="/user-operation/add-user"
          element={
            <AdminWrapper>
              <AddUser />
            </AdminWrapper>
          }
        />
      </Routes>

      <ScrollToTop />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
