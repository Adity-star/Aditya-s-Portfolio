import React, { useContext } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
};

const ProjectCard = ({ project }) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  return (
    <article className="project-card">
      <style jsx>{`
        .project-card {
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
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          margin: 0;
          width: 100%;
          border: 1px solid ${theme.cardBorderColor};
        }

        .project-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          background: ${theme.cardFooterBackground};
        }

        .card-image-wrapper {
          position: relative;
          overflow: hidden;
          height: 220px;
          width: 100%;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover .card-image-wrapper img {
          transform: scale(1.1);
        }

        .card-body {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        .project-title {
          font-weight: 700;
          font-size: 1.5rem;
          color: ${theme.color};
          margin: 0 0 1rem;
          flex-shrink: 0;
          line-height: 1.3;
        }

        .project-content {
          flex: 1;
          font-size: 1rem;
          color: ${theme.color};
          margin-bottom: 1.5rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          min-height: 4.5em;
          line-height: 1.5;
          opacity: 0.8;
        }

        .project-links {
          display: flex;
          gap: 1rem;
          margin-top: auto;
          flex-wrap: wrap;
        }

        .project-link {
          background: ${theme.accentColor};
          color: #fff;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
          z-index: 2;
          border: none;
          font-size: 1rem;
        }

        .project-link:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
          transform: scale(1.05);
          outline: none;
          color: #fff;
          opacity: 0.9;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 1rem;
        }

        .project-tag {
          background: ${theme.cardFooterBackground};
          color: ${theme.color};
          border-radius: 12px;
          padding: 3px 10px;
          font-size: 0.75rem;
          font-weight: 600;
          user-select: none;
          transition: background-color 0.3s ease;
          border: 1px solid ${theme.cardBorderColor};
        }

        .project-tag:hover {
          background: ${theme.accentColor};
          color: #fff;
        }

        @media (max-width: 1200px) {
          .project-card {
            min-height: 480px;
          }

          .card-image-wrapper {
            height: 200px;
          }
        }

        @media (max-width: 768px) {
          .project-card {
            min-height: 450px;
          }

          .card-image-wrapper {
            height: 180px;
          }

          .card-body {
            padding: 1.25rem;
          }

          .project-title {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <div className="card-image-wrapper">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
        />
      </div>
      <div className="card-body">
        <h2 className="project-title">{project.title}</h2>
        <p className="project-content">{parseBodyText(project.bodyText)}</p>
        <div className="project-links">
          {project?.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {link.text}
            </a>
          ))}
        </div>
        {project.tags && (
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
