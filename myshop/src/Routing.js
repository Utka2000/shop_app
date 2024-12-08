import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default Routing;
