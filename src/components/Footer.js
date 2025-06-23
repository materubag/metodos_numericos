import React from 'react';
import { IoLogoGithub } from 'react-icons/io5';

const Footer = ({ isDark }) => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-logo">
                    <img src="/logo192.png" alt="Logo UTA" className="footer-icon" />
                    <a
                      href="https://github.com/materubag/metodos_numericos"
                    >
                      <IoLogoGithub className="footer-icon" />
                    </a>
                  </div>
        <p>© {new Date().getFullYear()} Métodos Numéricos • Ingeniería en Sistemas</p>
      </div>
    </footer>
  );
};

export default Footer;