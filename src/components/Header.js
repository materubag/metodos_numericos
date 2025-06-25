import React from 'react';

const Header = ({ theme, onThemeToggle }) => {
  const isDark = theme === 'dark';
  
  return (
    <header className="app-header">
      <div className="logo-container">
        <img src="/logo192.png" alt="Logo UTA" className="app-logo pulse-animation" />
        <div className="title-container">
          <h1>Métodos Numéricos</h1>
          <p>Universidad Técnica de Ambato</p>
        </div>
      </div>
      <button 
        className="theme-toggle"
        onClick={onThemeToggle}
      >
        <i className={`bi bi-${isDark ? 'sun' : 'moon'}`}></i>
        {isDark ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
    </header>
  );
};

export default Header;