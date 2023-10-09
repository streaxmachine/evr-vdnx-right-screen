import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { any } from "prop-types";

import SoundContext from "./SoundContext";

const SoundProvider = ({ children }) => {
  const [muted, setMuted] = useState(true);
  const [isActiveIntro, setIsActiveIntro] = useState(true);
  const [audioPlaying, setAudioPlay] = useState(false);
  const audioRef = useRef();

  const changeMuted = useCallback((mute) => {
    setMuted(mute);
  }, []);

  const play = useCallback(() => {
    if (audioRef.current === null) {
      return;
    }

    if (!audioRef.current.playing) {
      audioRef.current.muted = muted;
      audioRef.current.play(0);
      setAudioPlay(true);
    }
  }, [muted]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlay(false);
    }
  }, []);

  // useEffect(() => {
  //   setIsLocked(isActiveIntro);
  // }, [isActiveIntro]);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/ambience.mp3");
    audioRef.current.loop = true;
  }, []);

  useEffect(() => {
    if (audioPlaying) audioRef.current.muted = muted;
  }, [muted, audioPlaying]);

  /* all sounds */

  // const [playTransition] = useSound('/sounds/transition.mp3');
  // const [playButtonHover] = useSound('/sounds/button-hover.mp3');
  // const [playButtonClick] = useSound('/sounds/button-click.mp3');
  // const [playEntrance] = useSound('/sounds/entrance.mp3');

  // const sounds = useMemo(() => {
  //   return {
  //     hover: playButtonHover,
  //     click: playButtonClick,
  //     transition: playTransition,
  //     intro: playEntrance,
  //   };
  // }, [playButtonHover, playButtonClick, playTransition, playEntrance]);

  // const soundPlay = useCallback(
  //   (name) => {
  //     if (!muted) sounds[name]({});
  //   },
  //   [sounds, muted]
  // );

  const value = useMemo(
    () => ({
      muted,
      isActiveIntro,
      play,
      pause,
      changeMuted,
      setIsActiveIntro,
    }),
    [changeMuted, isActiveIntro, muted, pause, play]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};

SoundProvider.propTypes = {
  children: any,
};

export default SoundProvider;
