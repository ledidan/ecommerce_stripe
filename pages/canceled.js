import React from "react";
import Link from "next/link";
import { RiEmotionSadLine } from "react-icons/ri";
const Canceled = () => {
  return (
    <div className="cancel-wrapper">
      <div className="cancel">
        <p className="icon">
          <RiEmotionSadLine />
        </p>
        <p>Forgot to add something to your cart? Shop around then come back to pay!</p>
        <Link href="/">
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
