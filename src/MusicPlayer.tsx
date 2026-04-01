import ReactPlayer from 'react'

function MusicPlayer() {
  return (
    <div className="music-player">
      <h2>Music Player</h2>
      <audio controls>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default MusicPlayer;