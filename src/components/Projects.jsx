import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const Projects = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

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
          margin-top: 100rem;
        }

        .section-content-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          padding-top: 0;
          top: 0;
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

        .ribbon {
          width: 100px;
          height: 28px;
          background: #ff9900;
          color: white;
          font-weight: 700;
          font-size: 0.85rem;
          line-height: 28px;
          text-align: center;
          position: absolute;
          top: 12px;
          right: -30px;
          transform: rotate(45deg);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          user-select: none;
          pointer-events: none;
          z-index: 3;
          animation: bounce 2s infinite ease-in-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: rotate(45deg) translateY(0);
          }
          50% {
            transform: rotate(45deg) translateY(-5px);
          }
        }

        @media (max-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .projects-section-bg {
            margin-top: 10rem;
          }
          
          .section-content-container {
            padding-top: 0;
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="section-title">Projects</h2>
                <motion.div 
                  className="projects-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {data.projects?.map((project, idx) => (
                    <motion.div 
                      key={project.title} 
                      style={{ position: 'relative' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      {project.featured && (
                        <div className="ribbon">Top Pick</div>
                      )}
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
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
