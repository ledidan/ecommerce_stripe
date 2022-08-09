import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrices, setTotalPrices] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrices((prevTotalPrices) => prevTotalPrices + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updateCartItem = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
      });
      setCartItems(updateCartItem);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
    console.log(`${product.name} added to the cart successfully.`);
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrices(
      (prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    // Using non - mutated method .. filter()
    let index = cartItems.filter((product) => product._id !== id);

    if (value === "inc") {
      foundProduct.quantity += 1;
      cartItems[index] = foundProduct;
      setTotalPrices((prevTotalPrices) => prevTotalPrices + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity -= 1;
        cartItems[index] = foundProduct;
        setTotalPrices((prevTotalPrices) => prevTotalPrices - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      } else {
        setTotalPrices(
          (prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity
        );
        setTotalQuantities(
          (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
        );
        setCartItems(index);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrices,
        totalQuantities,
        qty,
        setShowCart,
        setCartItems,
        incQty,
        decQty,
        setTotalQuantities,
        setTotalPrices,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
