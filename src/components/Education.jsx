import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css'; // keep your styles if you use any

function Education({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [width, setWidth] = useState('50vw');
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');

  useEffect(() => {
    fetch(endpoints.education)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);

    const updateLayout = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setMode('VERTICAL');
        setWidth('90vw');
      } else if (width < 768) {
        setMode('VERTICAL');
        setWidth('80vw');
      } else if (width < 1024) {
        setMode('VERTICAL_ALTERNATING');
        setWidth('70vw');
      } else {
        setMode('VERTICAL_ALTERNATING');
        setWidth('60vw');
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade bottom>
          <div className="section-content-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <Container style={{ width }}>
              <Chrono
                items={data.education}
                mode={mode}
                hideControls
                allowDynamicUpdate
                cardHeight={200}
                useReadMore={false}
                theme={{
                  primary: theme.accentColor,
                  secondary: theme.accentColor,
                  cardBgColor: theme.chronoTheme.cardBgColor,
                  cardForeColor: theme.chronoTheme.cardForeColor,
                  titleColor: theme.chronoTheme.titleColor,
                }}
              >
                <div className="chrono-icons">
                  {data.education.map((edu) =>
                    edu.icon ? (
                      <img
                        key={edu.icon.src}
                        src={edu.icon.src}
                        alt={edu.cardTitle}
                        style={{ width: 40, height: 40, borderRadius: '50%' }}
                      />
                    ) : null
                  )}
                </div>
              </Chrono>
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
