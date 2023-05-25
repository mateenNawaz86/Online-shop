import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProduct from "./components/admin/AddProduct";
import Products from "./components/shop/Products";
import ProductDetail from "./components/shop/ProductDetail";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} exact />
        <Route path="/add-product" element={<AddProduct />} exact />
        <Route path="/product-detail/:id" element={<ProductDetail />} exact />
      </Routes>
    </>
  );
};

export default App;
