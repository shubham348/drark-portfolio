import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../../../../component/BlogCard/BlogCard";
import "./projectSection.scss";

const ProjectSection = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = () => {
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shubham3480"
      )
      .then((data) => {
        const items = data?.data?.items?.slice(0, 3) || [];
        setArticles(items);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (articles?.length === 0) return null;
  console.log(articles);

  return (
    <div className="projects">
      <div className="projects__headers">
        <h2 className="h2">blogs</h2>
        <a className="projects__headers-link" href="/projects">
          View all ~~&gt;
        </a>
      </div>
      <div className="projects-list">
        {articles?.map((item) => (
          <BlogCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
