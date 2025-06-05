import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  blogTextContainer: {
    margin: 10,
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.1em',
    fontWeight: 400,
  },
  blogEntryContainer: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #ccc',
  },
};

function Blogs({ header }) {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetch(endpoints.blogs, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setBlogs(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {blogs ? (
            blogs.map((blog, index) => (
              <Fade key={index}>
                <Row style={styles.blogEntryContainer}>
                  <Col>
                    <h3>{blog.title}</h3>
                    <small><em>{blog.date}</em></small>
                    <div style={styles.blogTextContainer}>
                      <ReactMarkdown>{blog.content}</ReactMarkdown>
                    </div>
                  </Col>
                </Row>
              </Fade>
            ))
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

Blogs.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Blogs;
