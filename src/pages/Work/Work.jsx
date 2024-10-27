import React from "react";
import ComponentLayout from "../../component/ComponentLayout";
import BlogList from "../../component/BlogList/BlogList";
import Title from "../../component/Title";
import "./work.scss";

const Work = () => {
  return (
    <ComponentLayout>
      <div class="path">
        <h1 class="h1 path__name">work</h1>
        <p class="path__description">
          i have been writing blogs on Js and React, Here are some resent one's
        </p>
      </div>
      <div>
        <Title text="blogs" />
        <BlogList enableViewAll/>
      </div>
    </ComponentLayout>
  );
};

export default Work;
