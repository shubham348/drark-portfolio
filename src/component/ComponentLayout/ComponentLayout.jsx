import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { UserProvider } from "../../context/UserContext";
import "./componentLayout.scss"

const ComponentLayout = ({ children }) => {
  return (
    <UserProvider>
      <Header />
      <div className="layout__container">{children}</div>
      <Footer/>
    </UserProvider>
  );
};

export default ComponentLayout;
