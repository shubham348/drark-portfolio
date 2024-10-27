import React from "react";
import BlogList from "../../../../component/BlogList/BlogList";
import Title from "../../../../component/Title"
import Button from "../../../../component/Button";
import "./projectSection.scss";

const ProjectSection = () => {
  return (
    <div className="projects">
      <div className="projects__headers">
        <Title text="blogs"/> 
        <Button href="/work" text="View more ~~&gt;" customClass="projects__headers-link"/>
      </div>
      <BlogList maxItems={3}/>
    </div>
  );
};

export default ProjectSection;
