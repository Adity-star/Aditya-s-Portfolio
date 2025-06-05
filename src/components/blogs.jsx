import React, { useState, useEffect, useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import './Blogs.css';

function Blogs({ header }) {
  const theme = useContext(ThemeContext);
  const [blogs, setBlogs] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch(endpoints.blogs)
      .then((res) => res.json())
      .then((res) => {
        // Add id to each blog if not present
        const blogsWithIds = res.map((blog, index) => ({
          ...blog,
          id: blog.id || index + 1,
          tags: blog.tags || [] // Ensure tags array exists
        }));
        setBlogs(blogsWithIds);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // Collect all unique tags from blogs
  const allTags = useMemo(() => {
    if (!blogs) return [];
    const tagsSet = new Set();
    blogs.forEach((blog) => {
      if (blog.tags && blog.tags.length > 0) {
        blog.tags.forEach((tag) => tagsSet.add(tag));
      }
    });
    return ['All', ...Array.from(tagsSet)];
  }, [blogs]);

  // Filter blogs by tag and search term
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    return blogs.filter((blog) => {
      const matchesTag = selectedTag === 'All' || (blog.tags && blog.tags.includes(selectedTag));
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [blogs, selectedTag, searchTerm]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx>{`
        .blogs-section-bg {
          background: ${theme.background};
          min-height: 100vh;
          padding: 0;
          position: relative;
          overflow: visible;
          width: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        .section-content-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          padding-top: 50rem;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          overflow: visible;
          flex: 1;
          width: 100%;
          position: relative;
        }

        .section-title {
          color: ${theme.color};
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 4rem;
          text-align: center;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 2;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2.5rem;
          margin-bottom: 3rem;
          align-items: stretch;
          padding: 1rem;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        .blog-card {
          border: none;
          border-radius: 20px;
          overflow: hidden;
          background: ${theme.cardBackground};
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          cursor: pointer;
          height: 100%;
          min-height: 500px;
          animation: slideUpFade 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid ${theme.cardBorderColor};
        }

        @keyframes slideUpFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .blog-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          background: ${theme.cardFooterBackground};
        }

        .card-image-wrapper {
          position: relative;
          overflow: hidden;
          height: 200px;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blog-card:hover .card-image-wrapper img {
          transform: scale(1.1);
        }

        .card-image-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4));
          opacity: 0.6;
          pointer-events: none;
        }

        .card-body {
          padding: 1.5rem 2rem 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        .blog-title {
          font-weight: 700;
          font-size: 1.6rem;
          color: ${theme.color};
          margin: 0 0 0.5rem;
          flex-shrink: 0;
        }

        .blog-date {
          font-size: 0.9rem;
          color: ${theme.color};
          opacity: 0.7;
          margin-bottom: 1rem;
          flex-shrink: 0;
        }

        .blog-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 1rem;
          flex-shrink: 0;
        }

        .blog-tag {
          background: #eee;
          color: #666;
          border-radius: 12px;
          padding: 3px 10px;
          font-size: 0.75rem;
          font-weight: 600;
          user-select: none;
          transition: background-color 0.3s ease;
        }

        .blog-content {
          flex: 1;
          font-size: 1rem;
          color: #555;
          margin-bottom: 1.5rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          min-height: 4.5em;
        }

        .btn-read-more {
          align-self: flex-start;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(102, 126, 234, 0.5);
          transition: all 0.3s ease;
          margin-top: auto;
          display: inline-block;
          position: relative;
          z-index: 2;
        }

        .btn-read-more:hover {
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.7);
          transform: scale(1.05);
          outline: none;
          color: white;
        }

        @media (max-width: 1200px) {
          .blogs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .section-content-container {
            padding-top: 50rem;
          }

          .blogs-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0.5rem;
          }
          
          .container {
            padding: 0 1rem;
          }
          
          .section-title {
            font-size: 1.8rem;
            margin-bottom: 2rem;
          }
        }

        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .pagination-button {
          background: ${theme.cardBackground};
          border: 1px solid ${theme.cardBorderColor};
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          color: ${theme.color};
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .pagination-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          background: ${theme.cardFooterBackground};
        }

        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .pagination-info {
          color: ${theme.color};
          font-weight: 600;
          font-size: 1.1rem;
        }

        .search-container {
          background: ${theme.cardBackground};
          backdrop-filter: blur(10px);
          border-radius: 25px;
          padding: 1rem;
          margin-bottom: 2rem;
          border: 1px solid ${theme.cardBorderColor};
        }

        .search-input-group {
          background: ${theme.cardFooterBackground};
          border-radius: 20px;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .search-input {
          border: none;
          background: transparent;
          padding: 0.5rem;
          width: 100%;
          color: ${theme.color};
          font-size: 1rem;
        }

        .search-input::placeholder {
          color: ${theme.color};
          opacity: 0.6;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .tag-badge {
          background: ${theme.cardBackground};
          color: ${theme.color};
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid ${theme.cardBorderColor};
        }

        .tag-badge:hover {
          background: ${theme.cardFooterBackground};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .tag-badge.active {
          background: ${theme.accentColor};
          color: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <section className="blogs-section-bg" aria-label="Blogs Section">
        <Header header={header} />
        <div className="container">
          <div
            className={`search-container ${searchFocused ? 'focused' : ''}`}
            aria-label="Search blogs"
          >
            <div className={`search-input-group ${searchFocused ? 'focused' : ''}`}>
              <span
                className="search-icon"
                aria-hidden="true"
              >
                🔍
              </span>
              <input
                type="search"
                aria-label="Search blogs by title"
                className="search-input"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                spellCheck="false"
              />
            </div>
          </div>

          <div
            className="tags-container"
            role="list"
            aria-label="Blog tags filter"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-badge ${selectedTag === tag ? 'active' : ''}`}
                type="button"
                onClick={() => handleTagClick(tag)}
                aria-pressed={selectedTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          {isLoading && <FallbackSpinner />}

          {!isLoading && filteredBlogs.length === 0 && (
            <p
              style={{
                color: theme.color,
                textAlign: 'center',
                fontSize: '1.2rem',
                marginTop: '4rem',
              }}
              role="alert"
              aria-live="polite"
            >
              No blogs found.
            </p>
          )}

          {!isLoading && filteredBlogs.length > 0 && (
            <>
              <h2 className="section-title">
                {currentPage === 1 ? 'Featured Articles' : 'More Articles'}
              </h2>
              <div className="blogs-grid" role="list">
                {currentBlogs.map((blog, idx) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    idx={idx}
                    hoveredCard={hoveredCard}
                    setHoveredCard={setHoveredCard}
                  />
                ))}
              </div>

              <div className="pagination-container">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

Blogs.propTypes = {
  header: PropTypes.string.isRequired,
};

function BlogCard({ blog, idx, hoveredCard, setHoveredCard }) {
  const isHovered = hoveredCard === idx;
  const date = new Date(blog.date);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const excerpt =
    blog.content.length > 150 ? blog.content.slice(0, 150) + '…' : blog.content;

  return (
    <article
      className="blog-card"
      role="listitem"
      onMouseEnter={() => setHoveredCard(idx)}
      onMouseLeave={() => setHoveredCard(null)}
      tabIndex={0}
      aria-label={`Blog titled ${blog.title}`}
    >
      <div className="card-image-wrapper">
        <img
          src={blog.image}
          alt={`Image for blog titled ${blog.title}`}
          loading="lazy"
        />
      </div>
      <div className="card-body">
        <h2 className="blog-title">{blog.title}</h2>
        <time className="blog-date" dateTime={blog.date}>
          {formattedDate}
        </time>
        <div className="blog-tags" aria-label="Tags">
          {blog.tags?.map((tag) => (
            <span key={tag} className="blog-tag">
              {tag}
            </span>
          ))}
        </div>
        <p className="blog-content">{excerpt}</p>
        <a
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-read-more"
          aria-label={`Read more about ${blog.title}`}
        >
          Read More
        </a>
      </div>
    </article>
  );
}

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  idx: PropTypes.number.isRequired,
  hoveredCard: PropTypes.number,
  setHoveredCard: PropTypes.func.isRequired,
};

export default Blogs;
