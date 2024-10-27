import React from "react";
import HeroSection from "./component/HeroSection";
import ProjectSection from "./component/ProjectSection";
import ComponentLayout from "../../component/ComponentLayout";
import SkillSection from "../../component/SkillSection";
import AboutSection from "../../component/AboutSection";
import "./home.scss";

const Home = () => {
  return (
    <ComponentLayout>
      <HeroSection />
      <figure className="quote">
        <blockquote className="quote__text">
          With great power comes great electricity bill
        </blockquote>
        <figcaption className="quote__author">-Dr. Who</figcaption>
      </figure>
      <ProjectSection />
      <SkillSection />
      <AboutSection />
    </ComponentLayout>
  );
};

export default Home;
