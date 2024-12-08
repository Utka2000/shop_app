import React, { createContext, useContext, useState } from "react";

const Cartcontext = createContext();

export const useCart = () => {
  return useContext(Cartcontext);
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addtoCart = () => {
    console.log("added to Cart");
  };

  return (
    <Cartcontext.Provider value={{ addtoCart }}>
      {children}
    </Cartcontext.Provider>
  );
};

export default CartProvider;
