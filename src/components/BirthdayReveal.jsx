
import { useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import birthdayConfig from "../config/birthday";

export default function BirthdayReveal({ onContinue }) {
  const [candlesLit, setCandlesLit] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const lightCandles = () => {
    setCandlesLit(true);
    setCelebrated(false);
  };

  const blowCandles = () => {
    setCandlesLit(false);
    setCelebrated(true);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#f5b6cf", "#f8d9a0", "#ffffff", "#d9b7f0"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });
    }, 250);
  };

  return (
    <main className="birthday-screen">
      <motion.div
        className="birthday-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="birthday-eyebrow">
          TODAY IS ALL ABOUT YOU
        </p>

        <h1>{birthdayConfig.birthdayTitle}</h1>

        <h2>{birthdayConfig.recipientName}!</h2>

        <p className="birthday-message">
          {birthdayConfig.birthdayMessage}
        </p>

        <div className="cake-area">
          <motion.div
            className="cake"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="candles">
              {[1, 2, 3].map((candle) => (
                <div className="candle" key={candle}>
                  {candlesLit && (
                    <motion.div
                      className="flame"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ repeat: Infinity, duration: 0.7 }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="cake-top" />
            <div className="cake-middle" />
            <div className="cake-bottom" />
            <div className="cake-plate" />
          </motion.div>
        </div>

        {!candlesLit && !celebrated && (
          <button
            className="birthday-button"
            onClick={lightCandles}
          >
            Light the candles ✨
          </button>
           
        )}
        <button
  className="birthday-button"
  onClick={onContinue}
>
  Relive some beautiful moments →
</button>

        {candlesLit && (
          <motion.button
            className="birthday-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={blowCandles}
          >
            Make a wish & blow them out! 💨
          </motion.button>
        )}

        {celebrated && (
          <motion.div
            className="celebration-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Make a wish! ❤️</h3>
            <p>{birthdayConfig.finalMessage}</p>
          </motion.div>
        )}

      </motion.div>
    </main>
  );
}
