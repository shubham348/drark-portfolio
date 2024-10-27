import React from "react";
import Title from "../Title";
import "./funFact.scss";

const FunFact = () => {
  return (
    <div className="facts">
      <Title text="fun facts" />
      <div className="facts__content">
        <ul className="facts__list">
          <li className="fact">I like winter more than summer</li>

          <li className="fact">I like watching Anime</li>

          <li className="fact">I like cooking and trying new recipies</li>

          <li className="fact">Prefer Old songs over new one's</li>
        </ul>
        <div className="facts__illustrations"></div>
      </div>
    </div>
  );
};

export default FunFact;
