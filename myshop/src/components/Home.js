// c:\js\shop_app\myshop\src\components\Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const API_URL = "https://fakestoreapi.com/products";

const Home = ({ setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  const shop_cart = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    setProducts(data);
    const initialQuantities = {};
    data.forEach((item) => {
      initialQuantities[item.id] = 0;
    });
    setQuantities(initialQuantities);
  };

  const handleAddToCart = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));

    const product = products.find((item) => item.id === id);
    if (product) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    }
  };

  const handleRemoveFromCart = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[id] > 0 ? prevQuantities[id] - 1 : 0;
      return {
        ...prevQuantities,
        [id]: newQuantity,
      };
    });

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          return prevItems.filter((item) => item.id !== id);
        }
      }
      return prevItems;
    });
  };

  useEffect(() => {
    shop_cart();
  }, []);

  return (
    <section>
      <header className="header">
        <h1>Welcome to the Shop</h1>
        <Link to="/cart" className="cart-link">
          GO TO CART
        </Link>
      </header>
      <div className="product-container">
        {products.map((item) => {
          return (
            <div className="product-item" key={item.id}>
              <div className="image-wrapper">
                <img src={item.image} alt={item.title} />
              </div>
              <p>{item.title}</p>
              <h3>${item.price}</h3>
              <div>Quantity: {quantities[item.id]}</div>
              <div className="button-container">
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(item.id)}
                >
                  Add
                </button>
                <button
                  className="remove-from-cart"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
