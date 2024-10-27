import React from "react";
import Title from "../Title";
import Button from "../Button";
import aboutImage from "../../assets/images/aboutMe.png";
import "./aboutSection.scss"

const AboutSection = ({ isAboutPage = false }) => {
  return (
    <section className="about">
      <div className="about__content">
        <Title text="about me" />
        <div className="about__text">
          <p className="about__description">
            I’m a front-end developer based in India. I can develop responsive
            websites from scratch and raise them into modern user-friendly web
            experiences.
          </p>
          <p className="about__description">
            Transforming my creativity and knowledge into a websites has been my
            passion for over 5 years. I have been been working as a
            proffessional web developer since 2019.
          </p>
          {isAboutPage && (
            <>
              <p className="about__description">
                Skilled in implementing and maintaining unit and integration
                tests for React components.Proficient in modern JavaScript,
                including ES6+ syntax and best practices.
              </p>
              <p className="about__description">
                I also Write blogs on medium
              </p>
            </>
          )}
        </div>
        {!isAboutPage && <Button href="/about-me" text="Know More -&gt;" />}
      </div>
      <img src={aboutImage} alt="" className="about__image" />
    </section>
  );
};

export default AboutSection;
