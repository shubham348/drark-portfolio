import React from "react";
import Title from "../Title";
import SVGIcon from "../../assets/icons";
import "./skillSection.scss";

const skills = [
  {
    skillName: "HTML5",
    fontAwesomeClassname: "fa-brands fa-html5",
    style: {
      color: "#E34F26",
    },
  },
  {
    skillName: "CSS3",
    fontAwesomeClassname: "fa-brands fa-css3-alt",
    style: {
      color: "#1572B6",
    },
  },
  {
    skillName: "JavaScript",
    fontAwesomeClassname: "fa-brands fa-js",
    style: {
      color: "#F7DF1E",
    },
  },
  {
    skillName: "ReactJS",
    fontAwesomeClassname: "fa-brands fa-react",
    style: {
      color: "#61DAFB",
    },
  },
  {
    skillName: "Redux",
    fontAwesomeClassname: "redux",
    type: "svg",
  },
  {
    skillName: "NPM",
    fontAwesomeClassname: "fa-brands fa-npm",
    style: {
      color: "#CB3837",
    },
  },
  {
    skillName: "Git",
    fontAwesomeClassname: "fa-brands fa-git-alt",
    style: {
      color: "#E94E32",
    },
  },
  {
    skillName: "Material Ui",
    fontAwesomeClassname: "material-ui",
    type: "svg",
  },
  {
    skillName: "Sass",
    fontAwesomeClassname: "fa-brands fa-sass",
    style: {
      color: "#E94E32",
    },
  },
  {
    skillName: "Sass",
    fontAwesomeClassname: "tailwind",
    type: "svg",
  },
];
const SkillSection = () => {
  return (
    <div className="skill">
      <Title text="skills" />
      <ul className="dev-icons">
        {skills.map((logo) => {
          return (
            <li className="software-skill-inline" name={logo.skillName}>
              {logo?.type === "svg" ? (
                <div style={{ height: "40px", width: "40px" }}>
                  <SVGIcon name={logo.fontAwesomeClassname} />
                </div>
              ) : (
                <i class={logo.fontAwesomeClassname} style={logo.style} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SkillSection;
