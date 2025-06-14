import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={styles.mainContainer}
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={styles.nameStyle}
      >
        {data?.name}
      </motion.h1>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={styles.taglineStyle}
      >
        {data?.tagline}
      </motion.p>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={styles.roleRow}
      >
        <span>I&apos;m&nbsp;</span>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: data?.roles,
          }}
        />
      </motion.div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={styles.ctaContainer}
      >
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
      </motion.div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Social />
      </motion.div>
    </motion.div>
  ) : <FallbackSpinner />;
}

export default Home;
