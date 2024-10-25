import React from "react";
import heroImage from '../../../../assets/images/hero.png';
import svg from '../../../../assets/images/logo-outline.svg';

import "./heroSection.scss";

const HeroSection = () => {
  return (
    <div className="hero__container">
      <div className="hero__content">
        <h1 class="hero__title">
          Shubham is a <span>front-end</span> developer
        </h1>
        <div class="hero__description">
          I crafts responsive websites where technologies meet creativity
        </div>
      </div>
      <div className="hero__graphic">
        <img src={svg} alt="" class="hero__logo" />
        <img src={heroImage} alt="Shubham" class="hero__image" />
      </div>
    </div>
  );
};

export default HeroSection;
