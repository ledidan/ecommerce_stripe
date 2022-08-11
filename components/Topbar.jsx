import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineGithub, AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
const Topbar = () => {
  return (
    <div className="container mx-auto">
      <div className="topbar-contact flex items-center justify-between bg-gray-200 rounded-lg p-2">
        <div className="left flex text-center">
          <Link href="tel:0703550063">
            <p className="cursor-pointer text-xs mr-3 border-r-2 w-36 border-black">
              (+84)0703.550.063
            </p>
          </Link>
          <Link href="mailto:didan.mobe@gmail.com">
            <p className="cursor-pointer text-xs">didan.mobe@gmail.com</p>
          </Link>
        </div>
        <div className="right social-media flex">
          <Link href="https://github.com/ledidan">
            <AiOutlineGithub className="cursor-pointer text-xl mr-4 hover:scale-125 duration-200 " />
          </Link>
          <Link href="https://www.facebook.com/ledidan">
            <AiOutlineFacebook className="cursor-pointer text-xl mr-4 hover:scale-125 duration-200" />
          </Link>
          <Link href="https://www.instagram.com/blackdouble.d/">
            <AiOutlineInstagram className="cursor-pointer text-xl mr-4 hover:scale-125 duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
