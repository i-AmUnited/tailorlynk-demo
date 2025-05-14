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
      // Check if the item has catalogueId or materialId
      const itemId = item.catalogueId || item.materialId;
      const idType = item.catalogueId ? 'catalogueId' : 'materialId';
      
      if (!itemId) {
        console.warn("Item has no catalogueId or materialId:", item);
        return prevCart;
      }

      // Find existing item by either catalogueId or materialId
      const existingItem = prevCart.find(
        (cartItem) => 
          (cartItem.catalogueId && cartItem.catalogueId === item.catalogueId) || 
          (cartItem.materialId && cartItem.materialId === item.materialId)
      );

      showSuccessMessage("Item added to cart");

      if (existingItem) {
        return prevCart.map((cartItem) =>
          (cartItem.catalogueId && cartItem.catalogueId === item.catalogueId) || 
          (cartItem.materialId && cartItem.materialId === item.materialId)
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => 
      prevCart.filter((item) => 
        item.catalogueId !== id && item.materialId !== id
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const updateCartQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.catalogueId === id || item.materialId === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getCartItemById = (id) => {
    return cart.find(item => 
      item.catalogueId === id || item.materialId === id
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price || 0);
      return total + (price * item.quantity);
    }, 0);
  };
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      updateCartQuantity,
      getCartItemById,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};