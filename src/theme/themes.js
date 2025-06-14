// Base theme properties
const baseThemeProperties = {
  accentColor: '#3D84C6',
  navbarTheme: {
    linkColor: '#dedede',
    linkHoverColor: '#fefefe',
    linkActiveColor: '#fefefe',
  },
};

// Light Theme
export const lightTheme = {
  ...baseThemeProperties,
  type: 'light',
  background: '#fff',
  color: '#121212',
  chronoTheme: {
    cardBgColor: 'white',
    cardForeColor: 'black',
    titleColor: 'white',
  },
  timelineLineColor: '#ccc',
  cardBackground: '#fff',
  cardFooterBackground: '#f7f7f7',
  cardBorderColor: '#00000020',
  bsPrimaryVariant: 'light',
  bsSecondaryVariant: 'dark',
  socialIconBgColor: '#121212',
};

// Dark Theme
export const darkTheme = {
  ...baseThemeProperties,
  type: 'dark',
  background: '#121212',
  color: '#eee',
  chronoTheme: {
    cardBgColor: '#1B1B1B',
    cardForeColor: '#eee',
    titleColor: 'black',
  },
  timelineLineColor: '#444',
  cardBackground: '#060606',
  cardFooterBackground: '#181818',
  cardBorderColor: '#ffffff20',
  bsPrimaryVariant: 'dark',
  bsSecondaryVariant: 'light',
  socialIconBgColor: '#fefefe',
};

// AI Engineer Theme (Futuristic Dark)
export const AIEngineerTheme = {
  ...baseThemeProperties,
  type: 'ai',
  background: '#0d0d1a',
  color: '#f0f0f5',
  chronoTheme: {
    cardBgColor: '#1a1a2e',
    cardForeColor: '#f0f0f5',
    titleColor: '#00f5ff',
  },
  timelineLineColor: '#2e2e5a',
  cardBackground: '#1a1a2e',
  cardFooterBackground: '#22223b',
  cardBorderColor: '#2e2e5a',
  accentColor: '#00f5ff',
  shadow: '0 4px 24px rgba(0, 245, 255, 0.2)',
  socialIconBgColor: '#00f5ff',
  
  navbarTheme: {
    ...baseThemeProperties.navbarTheme,
    linkHoverColor: '#00f5ff',
    linkActiveColor: '#00f5ff',
  },

  button: {
    background: 'linear-gradient(135deg, #00f5ff, #0078ff)',
    textColor: '#ffffff',
    hoverShadow: '0 0 10px rgba(0, 245, 255, 0.7), 0 0 20px rgba(0, 120, 255, 0.5)',
  },

  code: {
    background: '#121212',
    text: '#00f5ff',
    border: '#00f5ff50',
  },
  
  // Additional futuristic elements
  glowEffect: '0 0 8px rgba(0, 245, 255, 0.7)',
  transition: 'all 0.3s ease-out',
};

// Theme collection
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  ai: AIEngineerTheme,
};