// c:\js\shop_app\myshop\src\App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";

const App = () => {
  const [cartItems, setCartItems] = React.useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setCartItems={setCartItems} />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
