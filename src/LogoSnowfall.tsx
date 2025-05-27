import React from 'react';
import uaenaLogo from './assets/uaena logo.png';

const NUM_LOGOS = 20;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const LogoSnowfall: React.FC = () => {
  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 10000 }}>
      {Array.from({ length: NUM_LOGOS }).map((_, i) => {
        const left = randomBetween(0, 100); // percent
        const duration = randomBetween(6, 14); // seconds
        const delay = randomBetween(0, 8); // seconds
        const size = randomBetween(32, 64); // px
        return (
          <img
            key={i}
            src={uaenaLogo}
            alt='uaena logo snowflake'
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: '-70px',
              width: size,
              height: size,
              opacity: 0.85,
              animation: `uaena-snowfall ${duration}s linear ${delay}s infinite`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        );
      })}
      <style>{`
        @keyframes uaena-snowfall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};
