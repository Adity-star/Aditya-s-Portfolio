import React, { useState, useEffect, useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
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
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(endpoints.blogs)
      .then((res) => res.json())
      .then((res) => {
        const blogsWithIds = res.map((blog, index) => ({
          ...blog,
          id: blog.id || index + 1,
          tags: blog.tags || []
        }));
        setBlogs(blogsWithIds);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    return blogs.filter((blog) => {
      const matchesTag = selectedTag === 'All' || (blog.tags && blog.tags.includes(selectedTag));
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [blogs, selectedTag, searchTerm]);

  const handleTagClick = (tag) => setSelectedTag(tag);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
          margin-top: 60rem;
        }

        .section-content-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          padding-top: 0;
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

        .search-container {
          margin-bottom: 2rem;
        }

        .search-input-group {
          display: flex;
          align-items: center;
          background: ${theme.cardBackground};
          border: 1px solid ${theme.cardBorderColor};
          border-radius: 30px;
          padding: 8px 15px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .search-input-group.focused {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-color: ${theme.accentColor};
        }

        .search-icon {
          font-size: 1.2rem;
          margin-right: 10px;
          color: ${theme.color};
          opacity: 0.7;
        }

        .search-input {
          border: none;
          outline: none;
          font-size: 1rem;
          width: 100%;
          padding: 6px 0;
          background: transparent;
          color: ${theme.color};
        }

        .search-input::placeholder {
          color: ${theme.color};
          opacity: 0.7;
        }

        .tags-container {
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tag-badge {
          background: ${theme.cardBackground};
          color: ${theme.color};
          border: 1px solid ${theme.cardBorderColor};
          padding: 8px 16px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .tag-badge:hover {
          background: ${theme.accentColor};
          color: #fff;
          border-color: ${theme.accentColor};
        }

        .tag-badge.active {
          background: ${theme.accentColor};
          color: #fff;
          border-color: ${theme.accentColor};
          font-weight: 600;
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

        .scroll-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 99;
          background: ${theme.accentColor};
          color: #fff;
          padding: 12px 16px;
          border: none;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .scroll-top-btn:hover {
          transform: scale(1.1);
          background: ${theme.accentColor};
          opacity: 0.9;
        }

        @media (max-width: 1200px) {
          .blogs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .blogs-section-bg {
            margin-top: 6rem;
          }
          
          .section-content-container {
            padding-top: 0;
          }

          .blogs-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0.5rem;
          }

          .container {
            padding: 0 1rem;
          }

          .search-input-group {
            padding: 6px 12px;
          }

          .tag-badge {
            padding: 6px 12px;
            font-size: 0.8rem;
          }
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
      `}</style>

      <section className="blogs-section-bg" aria-label="Blogs Section">
        <div className="section-content-container">
          <Header header={header} />
          <div className="container">
            <h2 className="section-title">Blogs</h2>
            <div
              className={`search-container ${searchFocused ? 'focused' : ''}`}
              aria-label="Search blogs"
            >
              <div className={`search-input-group ${searchFocused ? 'focused' : ''}`}>
                <span className="search-icon">🔍</span>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>

            <div className="tags-container">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-badge ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {isLoading && <FallbackSpinner />}

            {!isLoading && filteredBlogs.length === 0 && (
              <p style={{ color: theme.color, textAlign: 'center', marginTop: '4rem' }}>
                No blogs found.
              </p>
            )}

            {!isLoading && filteredBlogs.length > 0 && (
              <motion.div 
                className="blogs-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <BlogCard
                      blog={blog}
                      idx={idx}
                      hoveredCard={hoveredCard}
                      setHoveredCard={setHoveredCard}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {showScrollTop && (
              <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll to top">
                ↑
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

Blogs.propTypes = {
  header: PropTypes.string.isRequired,
};

function BlogCard({ blog, idx, hoveredCard, setHoveredCard }) {
  const theme = useContext(ThemeContext);
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
      onMouseEnter={() => setHoveredCard(idx)}
      onMouseLeave={() => setHoveredCard(null)}
      tabIndex={0}
      style={{
        background: theme.cardBackground,
        border: `1px solid ${theme.cardBorderColor}`,
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="card-image-wrapper" style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <img 
          src={blog.image} 
          alt={`Blog: ${blog.title}`} 
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      </div>
      <div className="card-body" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h2 className="blog-title" style={{ 
          color: theme.color,
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: '0 0 1rem',
          lineHeight: '1.3'
        }}>
          {blog.title}
        </h2>
        <time className="blog-date" dateTime={blog.date} style={{ 
          color: theme.color,
          opacity: 0.7,
          fontSize: '0.9rem',
          marginBottom: '0.5rem'
        }}>
          {formattedDate}
        </time>
        <p className="blog-content" style={{ 
          color: theme.color,
          opacity: 0.8,
          fontSize: '1rem',
          lineHeight: '1.5',
          marginBottom: '1.5rem',
          flex: 1
        }}>
          {excerpt}
        </p>
        <a
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-read-more"
          style={{
            background: theme.accentColor,
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block',
            transition: 'all 0.3s ease',
            alignSelf: 'flex-start'
          }}
        >
          Read More
        </a>
      </div>
    </article>
  );
}

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  hoveredCard: PropTypes.number,
  setHoveredCard: PropTypes.func.isRequired,
};

export default Blogs;
