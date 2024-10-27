import React from "react";
import ComponentLayout from "../../component/ComponentLayout";
import AboutSection from "../../component/AboutSection";
import SkillSection from "../../component/SkillSection";
import FunFact from "../../component/FunFact/FunFact";
import Experience from "../../component/Experience/Experience";
import "./about.scss";

const About = () => {
  return (
    <ComponentLayout>
      <div className="about-me">
        <div class="path">
          <h1 class="h1 path__name">about me</h1>
          <p class="path__description">who am i ?</p>
        </div>
        <AboutSection isAboutPage/>
      </div>
      <SkillSection />
      <Experience/>
      <FunFact/>
    </ComponentLayout>
  );
};

export default About;
