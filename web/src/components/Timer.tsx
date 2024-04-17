import React, { useState, useEffect } from 'react';
import "./Timer.css";

interface TimerProps {
  initialSeconds: number;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    // Start the countdown when the component mounts
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          onComplete(); // Call a callback function when the countdown is complete
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [initialSeconds, onComplete]); // Include initialSeconds and onComplete in the dependency array

  const bgTimer = 'https://res.cloudinary.com/duzcxnh0t/image/upload/f_auto,q_auto/pbunbzqqifys9jkdp43h';
  const clock = 'https://res.cloudinary.com/duzcxnh0t/image/upload/f_auto,q_auto/w9at6y9yjjgl3ycxd5e9';

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="nui-wrap">
      <div className='time-wrap'>
      <img src={bgTimer} alt="???????" className='bgTimer'></img>
      <p className='time'>TIME</p><p className='left'>LEFT</p>
      <img src={clock} alt="???????" className='clock'></img>
      <h1>{formatTime(seconds)}</h1>
      </div>
    </div>
  );
};

export default Timer;
