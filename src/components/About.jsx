import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 8px;
  transition: transform 0.3s ease;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SectionTitle = styled.h3`
  color: var(--bs-primary);
  font-weight: 600;
  margin-bottom: 1rem;
  border-left: 4px solid var(--bs-primary);
  padding-left: 10px;

  [data-bs-theme="dark"] & {
    color: var(--bs-light);
    border-left-color: var(--bs-light);
  }
`;

const SectionContent = styled.p`
  color: inherit;
  line-height: 1.8;
  font-size: 1.1em;
  margin: 0;
  opacity: 1;
  font-weight: 400;

  [data-bs-theme="dark"] & {
    color: #e0e0e0;
  }
`;

const AboutContainer = styled.div`
  color: inherit;

  [data-bs-theme="dark"] & {
    color: #ffffff;
  }

  [data-bs-theme="light"] & {
    color: #000000;
  }
`;

const styles = {
  introImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'sticky',
    top: '2rem',
  },
  image: {
    width: '100%',
    maxWidth: '350px',
    borderRadius: '12px',
    objectFit: 'cover',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

const About = ({ header }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/profile/about.json')
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Error loading about data:', err));
  }, []);

  const renderSection = (title, content, delay) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Section>
        <SectionTitle>{title}</SectionTitle>
        <SectionContent>{content}</SectionContent>
      </Section>
    </motion.div>
  );

  return (
    <>
      <Header title={header} />
      {data ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AboutContainer>
            <Container className="section-content-container">
              <Row className="align-items-center">
                <Col md={8}>
                  {renderSection('Intro', data.Intro, 0.3)}
                  {renderSection('What I Do', data.whatIDo, 0.4)}
                  {renderSection('Mindset', data.Mindset, 0.5)}
                  {renderSection('Personal', data.Personal, 0.6)}
                </Col>
                <Col md={4}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={styles.introImageContainer}
                  >
                    <img
                      src={data.imageSource}
                      alt="profile"
                      style={styles.image}
                    />
                  </motion.div>
                </Col>
              </Row>
            </Container>
          </AboutContainer>
        </motion.div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
