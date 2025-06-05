import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const Projects = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const totalPages = Math.ceil((data?.projects?.length || 0) / itemsPerPage);
  const currentProjects = data?.projects?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx>{`
        .projects-section-bg {
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

        .projects-grid {
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

        @media (max-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .section-content-container {
            padding-top: 50rem;
          }

          .projects-grid {
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
      `}</style>

      <section className="projects-section-bg" aria-label="Projects Section">
        <div className="section-content-container">
          <Header header={header} />
          <div className="container">
            {data ? (
              <Fade>
                <h2 className="section-title">
                  Projects
                </h2>
                <div className="projects-grid">
                  {currentProjects?.map((project) => (
                    <ProjectCard key={project.title} project={project} />
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
              </Fade>
            ) : (
              <FallbackSpinner />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
