import React from "react";
import Title from "../Title";
import Button from "../Button";
import hash from "../../assets/images/hashStudioz.jpeg";
import pibity from "../../assets/images/pibity.jpeg";
import global from "../../assets/images/logoprimary.svg";

import "./experience.scss";

const experiences = [
  {
    title: "Senior Associate Software Engineer",
    company: "Global Payments",
    company_url: "https://www.globalpayments.com/en-ap",
    logo_path: global,
    duration: "Nov 2023 - Present",
    location: "Pune",
  },
  {
    title: "Software Engineer",
    company: "HashStudioz Technologies Private Limited",
    company_url: "https://www.hashstudioz.com/",
    logo_path: hash,
    duration: "May 2021 - Sep 2023",
    location: "Noida",
  },
  {
    title: "Software Engineer",
    company: "Pibity",
    logo_path: pibity,
    duration: "Nov 2019 - Apr 2021",
    location: "Greater Noida",
  },
];

const Experience = () => {
  return (
    <div className="exp">
      <Title text="experience" />
      <div className="exp-list">
        {" "}
        {experiences?.map((item) => (
          <div className="exp__card">
            <img
              className="exp__image"
              src={item?.logo_path}
              alt={item?.company}
            />
            <div className="exp__content">
              <div className="exp__name">{item?.company}</div>
              <div className="exp__description">{item?.duration}</div>
            </div>
            {item?.company_url &&<div className="exp__links">
              <Button
                href={item?.company_url}
                target="_blank"
                text="Visit"
              />
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
