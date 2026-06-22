import React from 'react';
function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <span>🐟</span>
        <h3>Pesquera Talcahuano Sur SpA</h3>
      </div>
      <div className="navbar-links">
        <span>Portal de Operaciones</span>
        <span>|</span>
        <span className="navbar-status">Conectado al Lab</span>
      </div>
    </nav>
  );
}

export default Navbar;