import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProduct from "./components/admin/AddProduct";
import Products from "./components/shop/Products";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} exact />
        <Route path="/add-product" element={<AddProduct />} exact />
      </Routes>
    </>
  );
};

export default App;
