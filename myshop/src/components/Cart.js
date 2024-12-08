// c:\js\shop_app\myshop\src\components\Cart.js
import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css"; // Create a CSS file for Cart styles

const Cart = ({ cartItems, setCartItems }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleAddToCart = (id) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return prevItems; // Item not found, do nothing
      }
    });
  };

  const handleRemoveFromCart = (id) => {
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
      return prevItems; // Item not found, do nothing
    });
  };

  return (
    <div className="cart-container">
      <header className="header">
        <h1>Your Cart</h1>
        <Link to="/" className="cart-link">
          GO TO HOME PAGE
        </Link>
      </header>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <p className="cart-item-title">{item.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <div className="cart-item-buttons">
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="remove-from-cart"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <h3 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
