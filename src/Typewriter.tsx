import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;  // ms before typing starts
  speed?: number;  // ms per character
}

function Typewriter({ text, delay = 0, speed = 25 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let intervalId: ReturnType<typeof setInterval>;
    const timerId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(intervalId);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return <>{displayed}</>;
}

export default Typewriter;
