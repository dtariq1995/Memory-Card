import { useState } from 'react';
import ReactPlayer from 'react-player';

const tracks = [
  '/music/Oceanic Museum.mp3',
  '/music/Verdanturf Town.mp3',
  '/music/ending-theme.mp3',
  '/music/opening.mp3',
  '/music/title-screen.mp3',
];

function shuffleTracks(arr: string[]): string[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playlist] = useState<string[]>(() => shuffleTracks(tracks));

  function handleTogglePlay() {
    setPlaying(prev => !prev);
  }

  function handleTrackEnd() {
    setTrackIndex(prev => (prev + 1) % playlist.length);
  }

  return (
    <>
      <ReactPlayer
        src={playlist[trackIndex]}
        playing={playing}
        onEnded={handleTrackEnd}
        volume={0.3}
        width={0}
        height={0}
      />
      <button className="music-player" onClick={handleTogglePlay}>
        {playing
          ? <img className="music-icon" src='/music-on.png' alt="Pause Music" />
          : <img className="music-icon" src='/music-off.png' alt="Play Music" />}
      </button>
    </>
  );
}

export default MusicPlayer;
