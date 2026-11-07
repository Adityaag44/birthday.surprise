
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import birthdayConfig from "../config/birthday";

export default function OpeningScreen({ onOpen }) {
  return (
    <main className="opening-screen">
      <div className="ambient-glow" />

      <motion.div
        className="opening-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="heart-icon"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart size={27} fill="currentColor" />
        </motion.div>

        <p className="eyebrow">
          <Sparkles size={14} />
          A SPECIAL DAY • A SPECIAL PERSON
        </p>

        <h1>{birthdayConfig.openingTitle}</h1>

        <h2>{birthdayConfig.recipientName}</h2>

        <p className="opening-subtitle">
          {birthdayConfig.subtitle}
        </p>

        <motion.button
          className="surprise-button"
          onClick={onOpen}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          {birthdayConfig.buttonText}
          <span> →</span>
        </motion.button>

        <p className="bottom-note">
          MADE WITH <Heart size={11} fill="currentColor" /> FOR YOU
        </p>
      </motion.div>

      <div className="floating-stars">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="star"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
            transition={{
              duration: 2 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>
    </main>
  );
}
