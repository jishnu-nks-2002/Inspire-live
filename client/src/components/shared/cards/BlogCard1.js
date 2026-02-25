"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BlogCard1 = ({ blog, idx = 0 }) => {
  const {
    _id,
    id,
    title,
    img,
    smallImg,
    category,
    author,        // String in your schema
    authorImg,
    createdAt,
    desc,          // Short description in your schema
    body,          // Full content
  } = blog || {};

  const blogId = String(_id || id);
  
  // Helper function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/blog/blog-placeholder.svg";
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    if (imagePath.startsWith('/uploads/')) return imagePath;
    if (imagePath.startsWith('uploads/')) return `/${imagePath}`;
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  const [imgSrc, setImgSrc] = useState(getImageUrl(smallImg || img));
  const [imgError, setImgError] = useState(false);

  const blogTitle = title || "Untitled Post";
  
  // Use desc field from your schema
  const blogExcerpt = desc || "";
  
  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  const handleImageError = () => {
    console.error('Image failed to load:', imgSrc);
    if (!imgError) {
      setImgError(true);
      setImgSrc('/images/blog/blog-placeholder.svg');
    }
  };

  // Author is a string in your schema
  const authorName = author || null;

  return (
    <div
      className="blog-item wow fadeInUp"
      data-wow-delay={`.${idx + 2}s`}
    >
      <div className="blog-image">
        <Link href={`/blogs/${blogId}`}>
          <div style={{ position: 'relative', width: '100%', height: '270px' }}>
            <Image
              src={imgSrc}
              alt={blogTitle}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              onError={handleImageError}
              priority={idx < 3}
            />
          </div>
        </Link>
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          {category && (
            <Link href={`/blogs?category=${category}`} className="blog-category">
              {category}
            </Link>
          )}
          <span className="blog-date">
            <i className="tji-calendar"></i>
            {formatDate(createdAt)}
          </span>
        </div>
        <h3 className="title">
          <Link href={`/blogs/${blogId}`}>{blogTitle}</Link>
        </h3>
        {blogExcerpt && (
          <p className="desc">
            {blogExcerpt.length > 100 
              ? `${blogExcerpt.substring(0, 100)}...` 
              : blogExcerpt
            }
          </p>
        )}
        <div className="blog-footer">
          {authorName && (
            <div className="blog-author">
              <span>By {authorName}</span>
            </div>
          )}
          <Link href={`/blogs/${blogId}`} className="blog-btn">
            Read More <i className="tji-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard1;