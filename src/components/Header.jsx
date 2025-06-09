import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function Header({ title }) {
  return <h1 className="header-ai-vibe fade-in">{title}</h1>;
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
