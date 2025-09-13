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

  const addToCart = (item, quantity = 1, selectedSize, selectedColor) => {
    setCart((prevCart) => {
      // Check if the item has catalogueId or materialId
      const itemId = item.catalogueId || item.materialId;
      
      if (!itemId) {
        console.warn("Item has no catalogueId or materialId:", item);
        return prevCart;
      }

      showSuccessMessage("Item added to cart");

      // Always add as a new instance with a unique identifier
      const newCartItem = {
        ...item,
        quantity: parseInt(quantity) || 1,
        selectedSize,
        selectedColor,
        cartInstanceId: Date.now() + Math.random() // Unique identifier for each cart instance
      };

      return [...prevCart, newCartItem];
    });
  };

  const removeFromCart = (cartInstanceId) => {
    setCart((prevCart) => 
      prevCart.filter((item) => item.cartInstanceId !== cartInstanceId)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const updateCartQuantity = (cartInstanceId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartInstanceId === cartInstanceId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getCartItemById = (id) => {
    // This now returns all instances of an item with the given catalogueId or materialId
    return cart.filter(item => 
      item.catalogueId === id || item.materialId === id
    );
  };

  const getCartItemByInstanceId = (cartInstanceId) => {
    return cart.find(item => item.cartInstanceId === cartInstanceId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price || 0);
      return total + (price * item.quantity);
    }, 0);
  };

  // Helper function to get total quantity of a specific product (all instances combined)
  const getProductTotalQuantity = (productId) => {
    return cart
      .filter(item => item.catalogueId === productId || item.materialId === productId)
      .reduce((total, item) => total + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      updateCartQuantity,
      getCartItemById,
      getCartItemByInstanceId,
      getProductTotalQuantity,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};