import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

const SOUND_ASSETS = {
  light: require('../assets/sounds/tap.wav'),
  medium: require('../assets/sounds/pop.wav'),
  success: require('../assets/sounds/success.wav'),
  warning: require('../assets/sounds/warning.wav')
};

let audioInitialized = false;
let soundMuted = false;
const POOL_SIZE = 3;
const playerPools = {};
const poolCursors = {};

export const isSoundMuted = () => soundMuted;

export const setSoundMuted = (muted) => {
  soundMuted = !!muted;
};

export const toggleSoundMuted = () => {
  soundMuted = !soundMuted;
  if (!soundMuted) {
    triggerHaptic('medium');
  }
  return soundMuted;
};

function initAudioIfNeeded() {
  if (audioInitialized) return;
  audioInitialized = true;
  try {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'mixWithOthers'
    }).catch(() => {});
  } catch (e) {
    // Ignore audio mode errors
  }
}

function getNextPlayer(soundKey) {
  if (!playerPools[soundKey]) {
    playerPools[soundKey] = [];
    poolCursors[soundKey] = 0;
  }
  const pool = playerPools[soundKey];
  const idx = poolCursors[soundKey] % POOL_SIZE;
  poolCursors[soundKey] = (idx + 1) % POOL_SIZE;

  if (!pool[idx]) {
    const p = createAudioPlayer(SOUND_ASSETS[soundKey], {
      keepAudioSessionActive: true
    });
    p.volume = 1.0;
    pool[idx] = { player: p, playedOnce: false };
  }
  return pool[idx];
}

// Plays UI & gamification sound effects on Android & iOS mobile devices
export const triggerHaptic = (type = 'light') => {
  if (soundMuted) return;
  const soundKey = SOUND_ASSETS[type] ? type : 'light';

  try {
    initAudioIfNeeded();
    const slot = getNextPlayer(soundKey);
    if (!slot.playedOnce) {
      slot.playedOnce = true;
      slot.player.play();
    } else {
      Promise.resolve(slot.player.seekTo(0))
        .then(() => {
          slot.player.play();
        })
        .catch(() => {
          slot.player.play();
        });
    }
  } catch (e) {
    // Graceful fallback if audio device is unavailable
  }
};
