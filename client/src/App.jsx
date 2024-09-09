import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home"; // Ensure Home component is imported
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import SingleCategoryPage from "./pages/SingleCategoryPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:catName" element={<CategoryPage />} />
        <Route path="/category/:categoryId" element={<SingleCategoryPage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
