'use client';
import React, { useEffect, useState } from 'react';

// Define a type for your activities
interface Activity {
  label: string;
  hour: number;
}

const timePeriodInfo = [
  { label: 'Midnat' },
  { label: 'Midt på natten' },
  { label: 'Sidst på natten' },
  { label: 'Morgen' },
  { label: 'Midt på formiddagen' },
  { label: 'Sidst på formiddagen' },
  { label: 'Middag' },
  { label: 'Midt på eftermiddagen' },
  { label: 'Sidst på eftermiddagen' },
  { label: 'Aften' },
  { label: 'Midt på aftenen' },
  { label: 'Sidst på aftenen' },
];

const getTimePeriod = (hour: number) => {
  let timePeriod = 0;
  if (hour >= 0 && hour < 2) timePeriod = 0;
  else if (hour >= 2 && hour < 4) timePeriod = 1;
  else if (hour >= 4 && hour < 6) timePeriod = 2;
  else if (hour >= 6 && hour < 8) timePeriod = 3;
  else if (hour >= 8 && hour < 10) timePeriod = 4;
  else if (hour >= 10 && hour < 12) timePeriod = 5;
  else if (hour >= 12 && hour < 14) timePeriod = 6;
  else if (hour >= 14 && hour < 16) timePeriod = 7;
  else if (hour >= 16 && hour < 18) timePeriod = 8;
  else if (hour >= 18 && hour < 20) timePeriod = 9;
  else if (hour >= 20 && hour < 22) timePeriod = 10;
  else if (hour > 22) timePeriod = 11;
  return timePeriod;
};

function formatFullTime(hour: number, minute: number, second: number) {
  const now = new Date();
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const weekdayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
  const monthNames = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];

  return `Klokken ${pad(hour)}:${pad(minute)}:${pad(second)} - ${weekdayNames[now.getDay()]} den ${now.getDate()}. ${monthNames[now.getMonth()]} - ${now.getFullYear()}`;
}

const weekdayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

const defaultActivityInfo = [
  { label: 'Godmorgen', hour: 8 },
  { label: 'Frokost', hour: 12 },
  { label: 'Aftensmad', hour: 18 },
  { label: 'Godnat', hour: 23 },
];

// Function to get activityInfo from local storage or use default
const getActivityInfo = () => {
  return defaultActivityInfo;
};

// Function to save activityInfo to local storage
const saveActivityInfo = (info: Activity[]) => {
  localStorage.setItem('activityInfo', JSON.stringify(info));
};

export default function TimeIndicator() {
  const [viewportWidth, setViewportWidth] = useState(800);
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [second, setSecond] = useState(new Date().getSeconds());
  const [timePeriod, settimePeriod] = useState(getTimePeriod(hour));
  const [activityInfo, setActivityInfo] = useState(getActivityInfo());
  const [editingIndex, setEditingIndex] = useState(-1);
  const [tempLabel, setTempLabel] = useState('');
  const [tempHour, setTempHour] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [progression, setProgression] = useState(0);
  const [weekday, setWeekday] = useState('');

  const padding = 20;
  const lineLength = viewportWidth - 2 * padding;

  const findCurrenttimePeriodRange = (currentHour: number) => {
    const timePeriod = getTimePeriod(currentHour);
    let timePeriodStart = timePeriod * 2;
    let timePeriodEnd = timePeriodStart + 2;
    return { timePeriodStart, timePeriodEnd };
  };

  const circlePosition = (hour + minute / 60 + second / 3600) * (lineLength / 24);

  useEffect(() => {
    // This effect handles the clock update
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
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedInfo = localStorage.getItem('activityInfo');
      if (storedInfo) {
        setActivityInfo(JSON.parse(storedInfo));
      }
    }
  }, []);

  useEffect(() => {
    // This effect handles window resizing, but only on the client side
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setViewportWidth(window.innerWidth);
      };

      // Set the initial width and attach the resize event listener
      setViewportWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);  

  // CRUD operations for activityInfo
  const addActivity = () => {
    const newActivity = { label: tempLabel, hour: tempHour };
    const updatedActivityInfo = [...activityInfo, newActivity];
    setActivityInfo(updatedActivityInfo);
    saveActivityInfo(updatedActivityInfo);
    setTempLabel('');
    setTempHour(0);
  };

  const editActivity = (index: number) => {
    setEditingIndex(index);
    setTempLabel(activityInfo[index].label);
    setTempHour(activityInfo[index].hour);
  };

  const saveEdit = (index: number) => {
    const updatedActivityInfo = [...activityInfo];
    updatedActivityInfo[index] = { label: tempLabel, hour: tempHour };
    setActivityInfo(updatedActivityInfo);
    saveActivityInfo(updatedActivityInfo);
    setEditingIndex(-1);
    setTempLabel('');
    setTempHour(0);
  };

  const deleteActivity = (index: number) => {
    const updatedActivityInfo = [...activityInfo];
    updatedActivityInfo.splice(index, 1);
    setActivityInfo(updatedActivityInfo);
    saveActivityInfo(updatedActivityInfo);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {/* 12 Text Representation of Time Periods */}
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="text-[clamp(3rem,10vw,10rem)] text-center">
            {timePeriodInfo[timePeriod].label}
          </p>
        </div>
      {/* 24 Point Time Period Line of Progression */}
        <div className="flex-grow w-full flex items-center justify-center min-h-[160px]">
          <svg width={viewportWidth} height="600" viewBox={`0 0 ${viewportWidth} 300`} className="w-full h-full">
            {/* Weekday */}
            <text x={padding} y="50" fontSize="70">{weekday}</text>
            {/* Line of Progression Colours */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" style={{ stopColor: "midnightblue", stopOpacity: 1 }} />
                <stop offset="25%" style={{ stopColor: "#ADD8E6", stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: "#FFFF00", stopOpacity: 1 }} />
                <stop offset="75%" style={{ stopColor: "#ADD8E6", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "midnightblue", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <line x1={padding} y1="80" x2={lineLength + padding} y2="80" stroke="url(#gradient)" strokeWidth="25" />
            {/* 24 Point Time Period Markers */}
            {Array.from({ length: 25 }, (_, i) => i).map((_, i) => (
              <line
                key={i}
                x1={padding + (lineLength / 24) * i}
                y1="72"
                x2={padding + (lineLength / 24) * i}
                y2="88"
                stroke="black"
                strokeWidth="6"
              />
            ))}
            {/* Daily activities */}
              {activityInfo.map((activity: Activity, index: number) => (
              <g key={index}>
                <circle
                  cx={padding + (lineLength / 24) * activity.hour}
                  cy="80"
                  r="15"
                  fill="black"
                />
                <text
                  x={padding + (lineLength / 24) * activity.hour + 10}
                  y="140"
                  fontSize="55"
                  textAnchor="end"
                  transform={`rotate(-30, ${padding + (lineLength / 24) * activity.hour + 10}, 110)`}
                >
                  {activity.label}
                </text>
              </g>
            ))}
            {/* Red progression line */}
            <g>
              <line x1={padding} y1="80" x2={padding + circlePosition} y2="80" stroke="red" strokeWidth="12" />
              <circle cx={padding + circlePosition} cy="80" r="15" strokeWidth="10" stroke="red" fill="red" />
            </g>
          </svg>
        </div>
      {/* Day, Date, Year and Time */}
        <div className="absolute bottom-0 right-0 m-4 opacity-80">
          <p className="text-[clamp(0.8rem,2vw,1.2rem)]">
            {formatFullTime(Math.floor(hour), minute, second)}
          </p>
        </div>
      {/* Overlay for Managing Activities */}
        {showOverlay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setShowOverlay(false)}
                className="text-white bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded"
              >
                Luk
              </button>
            </div>
              <div className="mt-4">
                {/* Activity List */}
                {activityInfo.map((activity: Activity, index: number) => (
                  <div key={index} className="border-b border-gray-200 py-2">
                    {editingIndex === index ? (
                      <div className="flex flex-col space-y-2">
                        <input 
                          className="border rounded p-2"
                          value={tempLabel} 
                          onChange={(e) => setTempLabel(e.target.value)} 
                        />
                        <input 
                          className="border rounded p-2"
                          type="number" 
                          value={tempHour} 
                          onChange={(e) => setTempHour(Number(e.target.value))} 
                        />
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => saveEdit(index)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          >
                            Gem
                          </button>
                          <button 
                            onClick={() => setEditingIndex(-1)}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                          >
                            Luk
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <span>{activity.label} - {activity.hour}</span>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => editActivity(index)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
                          >
                            Tilpas
                          </button>
                          <button 
                            onClick={() => deleteActivity(index)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {/* Add New Activity Form */}
                <div className="mt-4 flex flex-col space-y-2">
                  <input 
                    className="border rounded p-2"
                    value={tempLabel} 
                    onChange={(e) => setTempLabel(e.target.value)} 
                    placeholder="Label for aktivitet"
                  />
                  <input 
                    className="border rounded p-2"
                    type="number" 
                    value={tempHour} 
                    onChange={(e) => setTempHour(Number(e.target.value))} 
                    placeholder="Hour"
                  />
                  <button 
                    onClick={addActivity}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Tilføj aktivitet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      <button 
        className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-1 px-2 rounded"
        onClick={() => setShowOverlay(true)}>
        Tilpas aktiviteter
      </button>
    </div>
  );
};