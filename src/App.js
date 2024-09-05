import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import 'animate.css';
import './App.css';

const App = () => {
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const quotes = [
    "Teaching is the profession that creates all other professions.",
    "A good teacher can inspire hope, ignite the imagination, and instill a love of learning.",
    "The influence of a good teacher can never be erased.",
    "Teachers plant seeds of knowledge that grow forever.",
    "A teacher takes a hand, opens a mind, and touches a heart."
  ];

  const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(true);
      setCurrentQuote(getRandomQuote());
      setTimeout(() => setIsTimerComplete(true), 2000);
    }, 5000);

    // Set up dynamic quote change every 10 seconds after the initial display
    const quoteInterval = setInterval(() => {
      setCurrentQuote(getRandomQuote());
    }, 10000);

    // Window resize handler
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearInterval(quoteInterval); // Clear the interval when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className="app-container">
      {!showQuote && (
        <p className="intro-message animate__animated animate__fadeIn">
          Please wait, preparing a special message for you...
        </p>
      )}

      {showQuote && (
        <div className="quote-section animate__animated animate__lightSpeedInLeft">
          <p className="quote-text">
            {currentQuote}
          </p>
        </div>
      )}

      {isTimerComplete && (
        <>
          <h1 className="celebration-message animate__animated animate__bounceIn">
            Happy Teacher's Day!
          </h1>
          <i className="fas fa-heart celebration-icon"></i>
          <Confetti width={windowSize.width} height={windowSize.height} />
        </>
      )}
    </div>
  );
};

export default App;