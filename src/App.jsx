
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import "./App.css";

import OpeningScreen from "./components/OpeningScreen";
import BirthdayReveal from "./components/BirthdayReveal";
import Memories from "./components/Memories";
import Letter from "./components/Letter";

function App() {
  const [screen, setScreen] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);

  const audioRef = useRef(null);

  // Set volume whenever it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Attempt autoplay immediately when the website loads
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;

    audio.play().catch(() => {
      console.log(
        "Autoplay blocked. Waiting for user interaction."
      );
      setIsPlaying(false);
    });
  }, []);

  // Start music on the visitor's first interaction if autoplay was blocked
  const startMusicOnInteraction = () => {
    const audio = audioRef.current;

    if (audio && audio.paused) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // Open the birthday experience
  const startExperience = () => {
    const audio = audioRef.current;

    if (audio && audio.paused) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }

    setScreen(1);
  };

  // Play or pause without restarting the song
  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Music playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  };

  return (
    <div onClickCapture={startMusicOnInteraction}>

      {/* One persistent audio player across all screens */}
      <audio
        ref={audioRef}
        src="/music/birthday-song.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          console.error(
            "Unable to load birthday music. Check the MP3 file path."
          );
          setIsPlaying(false);
        }}
      />

      {/* Screen 1: Opening */}
      {screen === 0 && (
        <OpeningScreen onOpen={startExperience} />
      )}

      {/* Screen 2: Birthday celebration */}
      {screen === 1 && (
        <BirthdayReveal
          onContinue={() => setScreen(2)}
        />
      )}

      {/* Screen 3: Memories gallery */}
      {screen === 2 && (
        <Memories
          onContinue={() => setScreen(3)}
        />
      )}

      {/* Screen 4: Personal letter */}
      {screen === 3 && <Letter />}

      {/* Persistent floating music controls */}
      <div className="music-player">

        <button
          className="music-toggle"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause size={19} />
          ) : (
            <Play size={19} />
          )}
        </button>

        <div className="music-details">

          <span className="music-label">
            {isPlaying ? "NOW PLAYING" : "MUSIC PAUSED"}
          </span>

          <div className="music-volume">

            {volume === 0 ? (
              <VolumeX size={15} />
            ) : (
              <Volume2 size={15} />
            )}

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) =>
                setVolume(Number(e.target.value))
              }
              aria-label="Music volume"
            />

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
