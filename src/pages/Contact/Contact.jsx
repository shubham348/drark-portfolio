import React from "react";
import ComponentLayout from "../../component/ComponentLayout";
import Profile from "../../assets/images/profile.jpg"
import SocialMedia from "../../component/SocialMedia";
import "./contact.scss";

const Contact = () => {
  return (
    <ComponentLayout>
      <div class="path">
        <h1 class="h1 path__name">contact</h1>
        <p class="path__description">Where to connect?</p>
      </div>
      <div className="contact">
        <img className="contact__image" src={Profile} alt="Shubham Gupta"/>
        <SocialMedia/>
      </div>
    </ComponentLayout>
  );
};

export default Contact;
