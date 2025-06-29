import React, { useState } from 'react';
import { BsQrCode } from "react-icons/bs";

const Header = ({ theme, onThemeToggle }) => {
  const isDark = theme === 'dark';
  const [showQr, setShowQr] = useState(false);
  
  return (
    <>
      <header className="app-header">
        <div className="logo-container">
          <img src="/logo192.png" alt="Logo UTA" className="app-logo pulse-animation" />
          <div className="title-container">
            <h1>Métodos Numéricos</h1>
            <p>Universidad Técnica de Ambato</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button 
            className="qr-button"
            onClick={() => setShowQr(!showQr)}
            title="Mostrar código QR"
          >
            <BsQrCode size={24} />
          </button>
          
          <button 
            className="theme-toggle"
            onClick={onThemeToggle}
          >
            <i className={`bi bi-${isDark ? 'sun' : 'moon'}`}></i>
            {isDark ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
      </header>
      
      {/* Modal QR fuera de la estructura del header */}
      {showQr && (
        <div className="qr-overlay" onClick={() => setShowQr(false)}>
          <div className="qr-modal" onClick={e => e.stopPropagation()}>
            <div className="qr-content">
              <button className="qr-close" onClick={() => setShowQr(false)}>×</button>
              <img src="/QR_Render.jpg" alt="Código QR" className="qr-image" />
              <p>Escanea para más información</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;