import React from 'react';
import './styles.css';

export function Home() {
  return (
    <div className="message-container">
      <div style={{ textAlign: 'center', fontSize: '36px', fontFamily: 'Montserrat' }}>
        <p>BIENVENIDO A NUESTRA PÁGINA WEB</p>
      </div>
      <p className="message-text"></p>
      <div className="app-container">
        <div className="app-image-container">
          <img className="message-image" src="/imagen/bandicam 2023-04-05 12-37-19-536.jpg" alt="Imagen 1" />
          <img className="message-image" src="/imagen/bandicam 2023-04-05 12-31-50-619.jpg" alt="Imagen 2" />
          <img className="message-image" src="/imagen/bandicam 2023-04-05 12-32-25-319.jpg" alt="Imagen 3" />
        </div>
      </div>
      <div className="video-container">
        <video width="300" height="200" controls>
        <source src="/video/bandicam 2021-08-16 11-18-05-139.mp4" type="video/mp4" />
      </video>
    </div>
    </div>
  );
}
