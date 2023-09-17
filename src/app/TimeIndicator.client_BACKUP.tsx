'use client';
import React, { useEffect, useState } from 'react';

const zoneInfo = [
  { label: 'Midnat'},
  { label: 'Midt på natten'},
  { label: 'Sidst på natten'},
  { label: 'Morgen'},
  { label: 'Først på formiddagen'},
  { label: 'Sidst på formiddagen'},
  { label: 'Frokost'},
  { label: 'Eftermiddag'},
  { label: 'Sidst på eftermiddagen'},
  { label: 'Aften'},
  { label: 'Første på aftenen'},
  { label: 'Sidst på aftenen'},
];

const getZone = (hour) => {
  let zone = 0;
  if (hour >= 2 && hour < 4) zone = 1;
  else if (hour >= 4 && hour < 6) zone = 2;
  else if (hour >= 6 && hour < 8) zone = 3;
  else if (hour >= 8 && hour < 10) zone = 4;
  else if (hour >= 10 && hour < 12) zone = 5;
  else if (hour >= 12 && hour < 14) zone = 6;
  else if (hour >= 14 && hour < 16) zone = 7;
  else if (hour >= 16 && hour < 18) zone = 8;
  else if (hour >= 18 && hour < 20) zone = 9;
  else if (hour >= 20 && hour < 22) zone = 10;
  else if (hour >= 22 || hour < 2) zone = 11;

  return zone;
};

function formatTime(hour, minute, second) {
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
  return `${pad(hour)}:${pad(minute)}:${pad(second)}`;
}

function formatFullTime(hour, minute, second) {
  const now = new Date();
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
  const weekdayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
  const monthNames = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
  
  return `${weekdayNames[now.getDay()]} den ${now.getDate()}. ${monthNames[now.getMonth()]} ${now.getFullYear()} - ${pad(hour)}:${pad(minute)}:${pad(second)}`;
}

const TimeIndicator: React.FC = () => {
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [second, setSecond] = useState(new Date().getSeconds());
  const [zone, setZone] = useState(getZone(hour));

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const newHour = now.getHours();
      const newMinute = now.getMinutes();
      const newSecond = now.getSeconds();
      const exactHour = newHour + newMinute / 60 + newSecond / 3600;
      setHour(exactHour);
      setMinute(newMinute);
      setSecond(newSecond);
      setZone(getZone(newHour));
    };

    const intervalId = setInterval(updateClock, 1000); // Update every second
    updateClock(); // Call once initially to set the initial state
    return () => clearInterval(intervalId); // Clean up interval when the component unmounts
  }, []);

  return (
    <div className="h-screen flex flex-col items-center">
      {/* Time of the day */}
      <div className="h-3/10 text-center">
        <p className="text-9xl" >
          {zoneInfo[zone].label}
        </p>
      </div>
      {/* Digital Clock */}
      <div className="h-1/10">
        <p className="text-3xl m-5" >
          {formatFullTime(Math.floor(hour), minute, second)}
        </p>
      </div>
      {/* Analog Clock */}
      <div className="h-3/5">
        <svg viewBox="0 0 200 200" className="h-full w-auto justify-center">    
          
          {/* Inner circle */}
          {/*<circle cx="100" cy="100" r="90" stroke="black" strokeWidth="1" fill="none" />*/}
          {/*SVG colors - https://upload.wikimedia.org/wikipedia/commons/e/e7/SVG1.1_Color_Swatch.svg*/}
          {/* Half circle 1 */}
          <path
            d="M 100 100 m -90 0 a 90 90 0 1 0 180 0"
            fill="lightskyblue"
            stroke="lightskyblue"
            opacity="0.8"
            strokeWidth="5"
          />

          {/* Half circle 2 */}
          <path
            d="M 100 100 m 90 0 a 90 90 0 1 0 -180 0"
            fill="lightgreen"
            stroke="lightgreen"
            opacity="0.8"
            strokeWidth="5"
          />
          
          {/* circle 2 */}
          <path
            d="M 100 100 m 90 0 a 90 90 0 1 0 -180 0"
            fill="lightgreen"
            stroke="lightgreen"
            opacity="0.8"
            strokeWidth="5"
          />

          {/* Hour hand */}
          <g transform={`rotate(${(hour % 24) * 15 - 180}, 100, 100)`}>
            <line x1="100" y1="94" x2="100" y2="26" stroke="red" strokeWidth="3" opacity="0.7" />
            <circle cx="100" cy="100" r="5" fill="red" opacity="0.7"/>
          </g>

          {/* Zones and text */}
          {Array.from({ length: 12 }, (_, i) => {
            const startAngle = (i * 30 + 180) % 360; // Add 180 degrees and modulo by 360
            const endAngle = (startAngle + 30) % 360;
            const startRadian = (startAngle - 90) * (Math.PI / 180);
            const endRadian = (endAngle - 90) * (Math.PI / 180);
            const startX = 100 + 95 * Math.cos(startRadian);
            const startY = 100 + 95 * Math.sin(startRadian);
            const endX = 100 + 95 * Math.cos(endRadian);
            const endY = 100 + 95 * Math.sin(endRadian);

            const id = `textPath${i}`;

            return (
              <g key={i}>
                <path id={id} d={`M ${startX} ${startY} A 95 95 0 0 1 ${endX} ${endY}`}stroke="none" fill="none"/>
              </g>
            );
          })}

          {/* Hour marks */}
          {Array.from({ length: 24 }, (_, i) => {
            const hourAngle = (i * 15 + 180) % 360; // Angle for each hour mark
            const hourRadian = (hourAngle - 90) * (Math.PI / 180); // Convert to radians

            // Define different lengths for even and odd hours
            const isEvenHour = i % 2 === 0;
            const startDistanceFromCenter = isEvenHour ? 85 : 85; // Start distance from center
            const endDistanceFromCenter = isEvenHour ? 75 : 80; // End distance from center

            const startX = 100 + startDistanceFromCenter * Math.cos(hourRadian); // Start point of the line
            const startY = 100 + startDistanceFromCenter * Math.sin(hourRadian); // Start point of the line
            const endX = 100 + endDistanceFromCenter * Math.cos(hourRadian); // End point of the line
            const endY = 100 + endDistanceFromCenter * Math.sin(hourRadian); // End point of the line

            return (
              <line key={i} x1={startX} y1={startY} x2={endX} y2={endY} stroke="black" strokeWidth="2" // Adjust the thickness as per your preference
              />
            );
          })}

          {/* Additional labels for 24.00, 06.00, 12.00, and 18.00 */}
          {/* Note: 0 degrees points to the top, and the circle progresses clockwise */}
          {/* 24.00 label */}
          <text x="100" y="31" font-weight="bold" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="black">
            Frokost
          </text>
          {/* 06.00 label */}
          <text x="173" y="95" font-weight="bold" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="black">
            Aften
          </text>
          {/* 12.00 label */}
          <text x="100" y="171" font-weight="bold" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="black">
            Midnat
          </text>
          {/* 18.00 label */}
          <text x="31" y="95" font-weight="bold" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="black">
            Morgen
          </text>
        </svg>
      </div>
    </div>
  );
};

export default TimeIndicator;