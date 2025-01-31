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
import CategoryOperation from "./pages/CategoryOperation";
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

import { Toaster } from "react-hot-toast";
import EditSubCategory from "./pages/EditSubCategory";
import AddSubCategory from "./pages/AddSubCategory";

// Wrapper for client-side pages (with Header and Footer)
const ClientWrapper = ({ children }) => (
  <>
    <Header />
    {children}
    <WhatsaapButton phoneNumber="8655706240" />
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
          path="/categories/:catId"
          element={
            <ClientWrapper>
              <CategoryPage />
            </ClientWrapper>
          }
        />

        <Route
          path="/category/:categoryName/:subCat"
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
            <AuthGuard>
              <AdminWrapper>
                <ProductOperation />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/category-operation"
          element={
            <AuthGuard>
              <AdminWrapper>
                <CategoryOperation />
              </AdminWrapper>
            </AuthGuard>
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
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/social-operation"
          element={
            <AuthGuard>
              <AdminWrapper>
                <SocialsOperation />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/category-operation/add-category"
          element={
            <AuthGuard>
              <AdminWrapper>
                <AddCategory />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/category-operation/add-subcategory/:categoryId"
          element={
            <AuthGuard>
              <AdminWrapper>
                <AddSubCategory />
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
          path="/category-operation/edit-category/:id"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditCategory />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/category-operation/edit-subcategory/:categoryId/:subcategory"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditSubCategory />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/product-operation/edit-product/:id"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditProduct />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/user-operation/edit-user/:userId"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditUser />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/social-operation/edit-social/:id"
          element={
            <AuthGuard>
              <AdminWrapper>
                <EditSocial />
              </AdminWrapper>
            </AuthGuard>
          }
        />
        <Route
          path="/social-operation/edit-contact/:id"
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

      <Toaster />
    </BrowserRouter>
  );
};

export default App;
