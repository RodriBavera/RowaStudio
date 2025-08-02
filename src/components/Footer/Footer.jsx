import React from "react";
import './Footer.css';
import logoFooter from '../../assets/imgFooter.png'; 

export default function Footer() {
  return (
    <footer className="footer-custom text-white py-4 ">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logoFooter} alt="Rowa Studio Logo" className="logo-img" />
          </div>
          <div className="footer-text">
            <p className="mb-1">© 2025 Rowa Studio - Todos los derechos reservados</p>
            <p>
              <a href="https://instagram.com" className="footer-link mx-2">
                Instagram
              </a>
              |
              <a href="https://facebook.com" className="footer-link mx-2">
                Facebook
              </a>
            </p>
            <p className="mb-0">Teléfono: +54 9 2954 123456</p>
          </div>
        </div>
      </div>
    </footer>
  );
}