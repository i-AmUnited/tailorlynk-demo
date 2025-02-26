import React, { createContext, useContext, useState, useEffect } from "react";
import { showSuccessMessage } from "../hooks/constants";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


const addToCart = (item, quantity = 1) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(
      (cartItem) => cartItem.catalogueId === item.catalogueId
    );

    showSuccessMessage("Item added to cart")

    if (existingItem) {
      return prevCart.map((cartItem) =>
        cartItem.catalogueId === item.catalogueId
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
    } else {
      return [...prevCart, { ...item, quantity }];
    }
  });
};

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.catalogueId !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const updateCartQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.catalogueId === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
