import React from 'react';

function Footer() {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} Pesquera Talcahuano Sur SpA. Todos los derechos reservados.</p>
      <p className="footer-sub">Desarrollado para la Evaluación de Programación Front End - INACAP San Pedro de la Paz.</p>
    </footer>
  );
}

export default Footer;