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

const App = () => {
  return (
    <BrowserRouter>
      <AutoScroll />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:catName" element={<CategoryPage />} />
        <Route
          path="/category/:categoryName"
          element={<SingleCategoryPage />}
        />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      <ScrollToTop />
      <WhatsaapButton phoneNumber="1212121212121" />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
