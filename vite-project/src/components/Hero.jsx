import React from 'react';
import heroImg from '../assets/hero.png';

function Hero() {
  return (
    <div 
      className="hero-container" 
      style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url(${heroImg})` }}
    >
      <h1>Panel de Control de Desembarques Diarios</h1>
      <p>
        Monitoreo en tiempo real de capturas, cuotas y procesamiento de recursos pelágicos en los terminales de la Región del Biobío.
      </p>
    </div>
  );
}

export default Hero;