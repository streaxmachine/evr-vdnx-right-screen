import { createContext } from 'react';

const SoundContext = createContext({
  muted: false,
  isActiveIntro: true,
  play: () => {},
  pause: () => {},
  changeMuted: () => {},
  setIsActiveIntro: () => {},
});

export default SoundContext;
