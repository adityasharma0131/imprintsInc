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
import EditCategory from "./pages/EditCategory";
import EditProduct from "./pages/EditProduct";
import EditUser from "./pages/EditUser";
import EditSocial from "./pages/EditSocial";
import EditContact from "./pages/EditContact";
import AuthGuard from "./components/AuthGuard";

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
            <AuthGuard>
              <AdminWrapper>
                <Dashboard />
              </AdminWrapper>
            </AuthGuard>
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
            <AuthGuard>
              <AdminWrapper>
                <ClientImg />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/user-operation"
          element={
            <AuthGuard>
              <AdminWrapper>
                <UserOperation />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/contact-operation"
          element={
            <AuthGuard>
              <AdminWrapper>
                <ContactOperation />
              </AdminWrapper>{" "}
            </AuthGuard>
          }
        />
        <Route
          path="/social-operation"
          element={
            <AuthGuard>
              <AdminWrapper>
                <SocialsOperation />
              </AdminWrapper>{" "}
            </AuthGuard>
          }
        />
        <Route
          path="/product-operation/add-category"
          element={
            <AuthGuard>
              <AdminWrapper>
                <AddCategory />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/product-operation/add-product"
          element={
            <AuthGuard>
              <AdminWrapper>
                <AddProduct />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/client-operation/add-logo"
          element={
            <AuthGuard>
              <AdminWrapper>
                <AddLogo />
              </AdminWrapper>
            </AuthGuard>
          }
        />

        <Route
          path="/user-operation/add-user"
          element={
            <AuthGuard>
              <AdminWrapper>
                <AddUser />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/product-operation/edit-category/:categoryId"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditCategory />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/product-operation/edit-product/:productId"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditProduct />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/product-operation/edit-user/:userId"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditUser />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/product-operation/edit-social/:socialId"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditSocial />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/product-operation/edit-contact/:contactId"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditContact />
              </AdminWrapper>
            </AuthGuard>
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
