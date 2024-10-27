import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import BlogCard from "../BlogCard";
import Button from "../Button";
import "./blogList.scss";

const BlogList = ({ maxItems, enableViewAll = false }) => {
  const { articles, userData } = useContext(UserContext);
  const itemsToShow = maxItems ? articles.slice(0, maxItems) : articles;
  return (
    <>
      <div className="projects-list">
        {itemsToShow?.map((item) => (
          <BlogCard item={item} />
        ))}
      </div>
      {enableViewAll && (
        <div className="viewAll">
          <Button href={userData?.mediumLink} target="_blank" text="View ALl" />
        </div>
      )}
    </>
  );
};

export default BlogList;
