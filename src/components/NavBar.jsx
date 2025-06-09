import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

const styles = {
  logoStyle: {
    width: 50,
    height: 40,
  },
};

// Glow & underline animation for external links
const ExternalNavLink = styled.a`
  position: relative;
  color: ${(props) => props.theme.navbarTheme.linkColor};
  transition: color 0.3s ease;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
    text-shadow:
      0 0 6px ${(props) => props.theme.accentColor},
      0 0 10px ${(props) => props.theme.accentColor};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 2px;
    width: 0%;
    background-color: ${(props) => props.theme.accentColor};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

// Same styling for internal links + active link effect
const InternalNavLink = styled(NavLink)`
  position: relative;
  color: ${(props) => props.theme.navbarTheme.linkColor};
  transition: color 0.3s ease;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
    text-shadow:
      0 0 6px ${(props) => props.theme.accentColor},
      0 0 10px ${(props) => props.theme.accentColor};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 2px;
    width: 0%;
    background-color: ${(props) => props.theme.accentColor};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
    font-weight: 700;

    &::after {
      width: 100%;
      box-shadow:
        0 0 8px ${(props) => props.theme.accentColor},
        0 0 15px ${(props) => props.theme.accentColor};
    }
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="md"
      bg="dark"
      variant="dark"
      className="navbar-custom"
      expanded={expanded}
      style={{
        backdropFilter: 'blur(8px)', // subtle glass effect
        backgroundColor: 'rgba(10, 10, 30, 0.85)', // dark translucent bg
        boxShadow: `0 0 15px ${theme.accentColor}50`, // soft glow around navbar
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container>
        {data?.logo && (
          <Navbar.Brand href="/">
            <img
              src={data.logo.source}
              alt="main logo"
              style={
                data.logo.height && data.logo.width
                  ? { height: data.logo.height, width: data.logo.width }
                  : styles.logoStyle
              }
            />
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            {data?.sections?.map((section) =>
              section.type === 'link' ? (
                <ExternalNavLink
                  key={section.title}
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setExpanded(false)}
                  className="navbar__link"
                  theme={theme}
                >
                  {section.title}
                </ExternalNavLink>
              ) : (
                <InternalNavLink
                  key={section.title}
                  to={section.href}
                  onClick={() => setExpanded(false)}
                  className="navbar__link"
                  theme={theme}
                >
                  {section.title}
                </InternalNavLink>
              )
            )}
          </Nav>
          <ThemeToggler onClick={() => setExpanded(false)} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
