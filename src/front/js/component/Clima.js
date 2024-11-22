import React from 'react';

const Clima = () => {
  const forecast = [
    { day: 'Lun', temp: 18 },
    { day: 'Mar', temp: 20 },
    { day: 'Mié', temp: 22 },
    { day: 'Jue', temp: 19 },
    { day: 'Vie', temp: 23 },
    { day: 'Sáb', temp: 21 },
    { day: 'Dom', temp: 20 },
  ];

  return (
    <div className="clima-container" style={{ padding: '20px', backgroundColor: '#E3F2FD' }}>
      <h2>Santiago 23°C</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        {forecast.map((item, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <p>{item.day}</p>
            <p>{item.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clima;

