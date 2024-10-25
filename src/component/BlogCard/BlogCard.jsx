/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import {
  extractFirstImageSrc,
  extractFirstParagraphText,
} from "../../utils/getDataFromHtml";
import "./blogCard.scss";

const BlogCard = ({ item }) => {
  return (
    <div className="blog">
      <img
        src={extractFirstImageSrc(item?.content)}
        alt="Deplos"
        className="blog__image"
      />
      <div className="blog__content">
        <div className="blog__name">{item?.title}</div>
        <div className="blog__description">
          {extractFirstParagraphText(item?.content)}
        </div>
        <div className="blog__links">
          <a href={item?.guid} className="button" target="_blank">
            Read Here =&gt;
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
