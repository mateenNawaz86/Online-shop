import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProduct from "./components/admin/AddProduct";
import Products from "./components/shop/Products";
import ProductDetail from "./components/shop/ProductDetail";
import Cart from "./components/shop/Cart";
import AdminProducts from "./components/admin/Products";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} exact />
        <Route path="/add-product" element={<AddProduct />} exact />
        <Route path="/product-detail/:id" element={<ProductDetail />} exact />
        <Route path="/cart" element={<Cart />} exact />
        <Route path="/admin-product" element={<AdminProducts />} exact />
      </Routes>
    </>
  );
};

export default App;
