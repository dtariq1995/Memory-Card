import { useState } from 'react';
import ReactPlayer from 'react-player';


function MusicPlayer() {

  const [playing, setPlaying] = useState(false);

  function handleTogglePlay() {
    setPlaying(prev => !prev);
  }

  return (
  <>
    <ReactPlayer src="/music.mp3" playing={playing} loop={true} controls={true} volume={0.15} width={0} height={0}/>
    <button className="music-player" onClick={handleTogglePlay}>
      {playing ? <img className="music-icon" src='/music-on.png' alt="Pause Music" />: <img className="music-icon" src='/music-off.png' alt="Play Music" />}
    </button>
  </>);
}

export default MusicPlayer;