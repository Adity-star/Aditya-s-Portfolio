import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import styled from 'styled-components';
import CountUp from 'react-countup';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

// Styled heading with hover effect
const Heading = styled.div`
  font-size: 1.5em;
  font-weight: 700;
  color: #2c3e50;
  margin: 20px 0 15px;
  letter-spacing: 0.05em;
  border-left: 4px solid #3498db;
  padding-left: 10px;
  user-select: none;
  cursor: default;
  transition: color 0.3s ease;

  &:hover {
    color: #2980b9;
  }
`;

const styles = {
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.1em',
    fontWeight: 400,
    lineHeight: 1.8,
  },
  introImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '350px',
    borderRadius: '12px',
    objectFit: 'cover',
  },
  impactContainer: {
    marginTop: 40,
  },
  impactItem: {
    textAlign: 'center',
    flex: 1,
  },
  impactValue: {
    fontSize: '2em',
    fontWeight: '700',
    color: '#3498db',
  },
  impactLabel: {
    marginTop: '0.5em',
    fontWeight: '600',
    color: '#2c3e50',
  },
  impactRow: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
};

const impacts = [
  { label: 'Projects Delivered', value: 5 },
  { label: 'Mentees Guided', value: 12 },
  { label: 'Research Papers', value: 2 },
];

function ImpactHighlights() {
  return (
    <div style={styles.impactContainer}>
      <h3 style={{ color: '#2c3e50', marginBottom: 20 }}>🚀 Impact Highlights</h3>
      <div style={styles.impactRow}>
        {impacts.map(({ label, value }) => (
          <Fade key={label} bottom cascade>
            <div style={styles.impactItem}>
              <CountUp end={value} duration={2} delay={0}>
                {({ countUpRef }) => (
                  <div style={styles.impactValue} ref={countUpRef} />
                )}
              </CountUp>
              <p style={styles.impactLabel}>{label}</p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}

function About({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row className="align-items-center">
                <Col md={7} xs={12} style={styles.introTextContainer}>
                  <Slide left cascade>
                    <Heading>👋 Who I Am</Heading>
                  </Slide>
                  <ReactMarkdown>{data.intro}</ReactMarkdown>

                  <Slide left cascade>
                    <Heading>⚙️ What I Do</Heading>
                  </Slide>
                  <ReactMarkdown>{data.whatIDo}</ReactMarkdown>

                  <Slide left cascade>
                    <Heading>🧠 How I Think</Heading>
                  </Slide>
                  <ReactMarkdown>{data.mindset}</ReactMarkdown>

                  <Slide left cascade>
                    <Heading>🌱 Beyond Code</Heading>
                  </Slide>
                  <ReactMarkdown>{data.personal}</ReactMarkdown>

              
                </Col>

                <Col md={5} xs={12} style={styles.introImageContainer}>
                  <img
                    src={data.imageSource}
                    alt="profile"
                    style={styles.image}
                  />
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
