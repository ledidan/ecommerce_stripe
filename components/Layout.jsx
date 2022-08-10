import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Topbar from "./Topbar";
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>DiDanz Dev Store</title>
        <link rel="icon" href="/images/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta property="og:title" content="Welcome to Dan HeadPhone" key="title" />
      </Head>
      <Topbar />
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
