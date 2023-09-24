import React, { useEffect, useState } from 'react';

const timePeriodInfo = [
  { label: 'Midnat' },
  { label: 'Først på natten' },
  { label: 'Sidst på natten' },
  { label: 'Morgen' },
  { label: 'Først på formiddagen' },
  { label: 'Sidst på formiddagen' },
  { label: 'Middag' },
  { label: 'Først på eftermiddagen' },
  { label: 'Sidst på eftermiddagen' },
  { label: 'Aften' },
  { label: 'Først på aftenen' },
  { label: 'Sidst på aftenen' },
];

const getTimePeriod = (hour: number) => {
  let timePeriod = 0;
  if (hour >= 2 && hour < 4) timePeriod = 1;
  else if (hour >= 4 && hour < 6) timePeriod = 2;
  else if (hour >= 6 && hour < 8) timePeriod = 3;
  else if (hour >= 8 && hour < 10) timePeriod = 4;
  else if (hour >= 10 && hour < 12) timePeriod = 5;
  else if (hour >= 12 && hour < 14) timePeriod = 6;
  else if (hour >= 14 && hour < 16) timePeriod = 7;
  else if (hour >= 16 && hour < 18) timePeriod = 8;
  else if (hour >= 18 && hour < 20) timePeriod = 9;
  else if (hour >= 20 && hour < 22) timePeriod = 10;
  else if (hour >= 22 || hour < 2) timePeriod = 11;
  return timePeriod;
};

{/*Digital Clock function*/}
function formatFullTime(hour: number, minute: number, second: number) {
  const now = new Date();
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const weekdayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
  const monthNames = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
  
  return `Klokken ${pad(hour)}:${pad(minute)}:${pad(second)} - ${weekdayNames[now.getDay()]} den ${now.getDate()}. ${monthNames[now.getMonth()]} - ${now.getFullYear()}`;
}

const weekdayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

{/* Time Period Line of Progression - Activities*/}
const activityInfo = [
  { label: 'Morgenmad', hour: 8 },
  { label: 'Frokost', hour: 12 },
  { label: 'Aftensmad', hour: 18 },
  { label: 'Sov godt! :-)', hour: 22 },
];

export default function TimeIndicator() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [second, setSecond] = useState(new Date().getSeconds());
  const [timePeriod, settimePeriod] = useState(getTimePeriod(hour));

  const padding = 20;
  const lineLength = viewportWidth - 2 * padding;

  const findCurrenttimePeriodRange = (currentHour: number) => {
    const timePeriod = getTimePeriod(currentHour);
    let timePeriodStart = timePeriod * 2;
    let timePeriodEnd = timePeriodStart + 2;
    return { timePeriodStart, timePeriodEnd };
  };

  const [progression, setProgression] = useState(0);
  const circlePosition = (hour + minute / 60 + second / 3600) * (lineLength / 24);
  const [weekday, setWeekday] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const newHour = now.getHours();
      const newMinute = now.getMinutes();
      const newSecond = now.getSeconds();
      const { timePeriodStart, timePeriodEnd } = findCurrenttimePeriodRange(newHour);
      const exactHour = newHour + newMinute / 60 + newSecond / 3600;
      const timePeriodRange = timePeriodEnd - timePeriodStart;
      const newProgression = (exactHour - timePeriodStart) / timePeriodRange;

      setWeekday(weekdayNames[now.getDay()]);
      setHour(newHour);
      setMinute(newMinute);
      setSecond(newSecond);
      settimePeriod(getTimePeriod(newHour));
      setProgression(newProgression);
    };

      const intervalId = setInterval(updateClock, 1000);
      return () => clearInterval(intervalId);
    }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {/* Time Period */}
      <div className="flex-1 flex items-center justify-center w-full">
        <p className="text-[clamp(3rem,10vw,10rem)] text-center">
          {timePeriodInfo[timePeriod].label}
        </p>
      </div>
      {/* Time Period Line of Progression */}
      <div className="flex-grow w-full flex items-center justify-center min-h-[150px]">
      <svg width={viewportWidth} height="50" className="w-full h-full">
        <text x={padding} y="25" fontSize="30">{weekday}</text>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" style={{ stopColor: "midnightblue", stopOpacity: 1 }} />
            <stop offset="25%" style={{ stopColor: "#ADD8E6", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#FFFF00", stopOpacity: 1 }} />
            <stop offset="75%" style={{ stopColor: "#ADD8E6", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "midnightblue", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <line x1={padding} y1="40" x2={lineLength + padding} y2="40" stroke="url(#gradient)" strokeWidth="8" />
          {Array.from({ length: 25 }, (_, i) => i).map((_, i) => (
            <line
              key={i}
              x1={padding + (lineLength / 24) * i}
              y1="35"
              x2={padding + (lineLength / 24) * i}
              y2="45"
              stroke="black"
              strokeWidth="4"
            />
          ))}
          {/* Activity markers */}
          {activityInfo.map((activity, i) => (
            <g key={i}>
              <circle
                cx={padding + (lineLength / 24) * activity.hour}
                cy="40"
                r="8"
                fill="black"
              />
              <text
                x={padding + (lineLength / 24) * activity.hour + 10}
                y="70"
                fontSize="25"
                textAnchor="end"
                transform={`rotate(-60, ${padding + (lineLength / 24) * activity.hour + 10}, 70)`}
              >
                {activity.label}
              </text>
            </g>
          ))}
          <line x1={padding} y1="40" x2={padding + circlePosition} y2="40" stroke="red" strokeWidth="5" />
          <g>
            <circle cx={padding + circlePosition} cy="40" r="15" strokeWidth="10" stroke="red" fill="red" />
          </g>
        </svg> 
      </div>
      {/* Day, Date, Year and Time */}
      <div className="absolute bottom-0 right-0 m-4 opacity-80">
        <p className="text-[clamp(0.8rem,2vw,1.2rem)]">
          {formatFullTime(Math.floor(hour), minute, second)}
        </p>
      </div>
    </div>
  );
};