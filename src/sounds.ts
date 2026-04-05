export function playSound(src: string, volume = 0.15) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play();
}

export function playLoop(src: string, volume = 0.15): HTMLAudioElement {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.loop = true;
  audio.play();
  return audio;
}

export function stopSound(audio: HTMLAudioElement | null) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}
