import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '4.5em',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taglineStyle: {
    fontSize: '1.4em',
    color: '#888',
    marginTop: '10px',
    textAlign: 'center',
    maxWidth: '700px',
  },
  mainContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
  },
  roleRow: {
    display: 'flex',
    fontSize: '1.8em',
    marginTop: '20px',
  },
  ctaContainer: {
    marginTop: '30px',
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#4f46e5',
    transition: 'all 0.3s ease',
  }
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Error loading home data:', err));
  }, []);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>{data?.name}</h1>
        <p style={styles.taglineStyle}>{data?.tagline}</p>

        <div style={styles.roleRow}>
          <span>I&apos;m&nbsp;</span>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>

        <div style={styles.ctaContainer}>
          {data?.cta?.resumeLink && (
            <a href={data.cta.resumeLink} style={styles.button} target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          )}
          {data?.cta?.github && (
            <a href={data.cta.github} style={styles.button} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {data?.cta?.linkedin && (
            <a href={data.cta.linkedin} style={styles.button} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
        </div>

        <Social />
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
