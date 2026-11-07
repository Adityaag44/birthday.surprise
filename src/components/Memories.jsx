
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Mail } from "lucide-react";
import birthdayConfig from "../config/birthday";

export default function Memories({ onContinue }) {
  const [selected, setSelected] = useState(null);

  return (
    <main className="memories-screen">

      <motion.header
        className="memories-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Heart className="memories-heart" fill="currentColor" />

        <p className="memories-eyebrow">
          A COLLECTION OF LITTLE MOMENTS
        </p>

        <h1>Little moments,</h1>
        <h2>endless memories.</h2>

        <p className="memories-intro">
          Every picture has a story.
          Every story holds a feeling.
          And some moments are simply unforgettable.
        </p>
      </motion.header>

      <section className="memory-grid">
        {birthdayConfig.memories.map((memory, index) => (
          <motion.article
            className="memory-card"
            key={memory.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            whileHover={{ y: -8, rotate: 0 }}
            onClick={() => setSelected(memory)}
          >
            <div className="memory-photo">
              <img
                src={memory.image}
                alt={memory.title}
                loading="lazy"
              />
            </div>

            <h3>{memory.title}</h3>
            <p>{memory.caption}</p>
          </motion.article>
        ))}
      </section>

      <p className="memories-footer">
        SOME MOMENTS LIVE BEYOND TIME ♥
      </p>

      <motion.button
        className="birthday-button memories-next-button"
        onClick={onContinue}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Mail size={16} style={{ marginRight: 8 }} />
        A little note for you →
      </motion.button>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="memory-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="memory-viewer"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-memory"
                onClick={() => setSelected(null)}
                aria-label="Close photo"
              >
                <X />
              </button>

              <img
                src={selected.image}
                alt={selected.title}
              />

              <h2>{selected.title}</h2>
              <p>{selected.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
