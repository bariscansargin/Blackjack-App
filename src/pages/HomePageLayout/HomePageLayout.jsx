import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
//Components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const HomePageLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomePageLayout;
