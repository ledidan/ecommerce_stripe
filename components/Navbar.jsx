import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <img src="/images/didanz-store.png" alt="logo" className="w-44 h-12" />
        </Link>
      </p>
      <button
        type="button"
        className="cart-icon relative"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping color="black" />
        <span className="bg-red-500 text-white w-5 h-5 absolute -right-2 bottom-5 text-sm text-center font-semibold rounded-lg">
          {totalQuantities}
        </span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
