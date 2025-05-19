import React from 'react';

export function MainLoader() {
  const loaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff0f6', // Fondo suave
    fontFamily: 'Arial, sans-serif', // Fuente legible
  };

  const textStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#b565a7', // Color relacionado con maquillaje
    animation: 'pulse 2s infinite, move 2s infinite',
  };

  return (
    <div style={loaderStyle}>
      <p style={textStyle}>Cargando...</p>
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes move {
          0% { transform: translateY(0); color: #b565a7; }
          50% { transform: translateY(-10px); color: #ff69b4; }
          100% { transform: translateY(0); color: #b565a7; }
        }
      `}</style>
    </div>
  );
}
