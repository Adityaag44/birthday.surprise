
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import birthdayConfig from "../config/birthday";

export default function Letter() {
  const letter = birthdayConfig.letter;

  return (
    <section className="letter-screen">
      <motion.div
        className="letter-container"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Sparkles className="letter-sparkle" />

        <p className="letter-eyebrow">
          {letter.eyebrow}
        </p>

        <h1>{letter.title}</h1>

        <div className="letter-paper">
          <Heart className="letter-heart" />

          <p className="letter-greeting">
            Dear {birthdayConfig.recipientName},
          </p>

          {letter.paragraphs.map((paragraph, index) => (
            <p className="letter-body" key={index}>
              {paragraph}
            </p>
          ))}

          <p className="letter-signature">
            {letter.closing}
            <br />
            {birthdayConfig.senderName}
          </p>
        </div>

        <p className="letter-footer">
          MADE WITH A LITTLE EXTRA LOVE ❤️
        </p>
      </motion.div>
    </section>
  );
}
