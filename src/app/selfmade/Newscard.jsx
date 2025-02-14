import React from "react";

const Newscard = ({ data }) => {
  const { title, excerpt, image, category, author, date, readTime, featured } = data;

  return (
    <div className={`news-card ${featured ? "featured" : ""}`}>
      <img src={image} alt={title} className="news-image" />
      <div className="news-content">
        <h3 className="news-title">{title}</h3>
        <p className="news-excerpt">{excerpt}</p>
        <p className="news-meta">
          <span>{category}</span> | <span>{author}</span> |{" "}
          <span>{date}</span> | <span>{readTime}</span>
        </p>
      </div>
    </div>
  );
};

export default Newscard;

