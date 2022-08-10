import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

import getStripe from "../lib/getStripe";
import toast from "react-hot-toast";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrices,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch(`/api/stripe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;
    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button className="cart-heading" type="button" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">{totalQuantities} items</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} className="inline" />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type="button" className="btn" onClick={() => setShowCart(false)}>
                Continue shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0])} className="cart-product-image" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5 className="text-2xl font-bold">{item.name}</h5>
                    <h4 className="text-xl">${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div
                      className="flex border border-black w-40"
                      style={{ width: "120px" }}
                    >
                      <p
                        className="flex items-center"
                        style={{ justifyContent: "space-evenly" }}
                      >
                        <span
                          className="minus text-red-500 cursor-pointer"
                          onClick={() => toggleCartItemQuantity(item._id, "dec")}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num p-2 border-black border-x">
                          {item.quantity}
                        </span>
                        <span
                          className="plus text-lime-500 cursor-pointer"
                          onClick={() => toggleCartItemQuantity(item._id, "inc")}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3 className="text-2xl font-bold">Subtotal: </h3>
              <h3 className="text-2xl">${totalPrices}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Checkout with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
