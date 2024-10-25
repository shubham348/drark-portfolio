import React from "react";
import Header from "../../component/Header/Header";
import HeroSection from "./component/HeroSection";
import ProjectSection from "./component/ProjectSection";
import "./home.scss";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home__container">
        <HeroSection />
        <figure className="quote">
            <blockquote className="quote__text">With great power comes great electricity bill</blockquote>
            <figcaption className="quote__author">-Dr. Who</figcaption>
        </figure>
        <ProjectSection/>
      </div>
    </>
  );
};

export default Home;
