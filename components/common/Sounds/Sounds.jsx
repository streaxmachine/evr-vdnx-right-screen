import React from "react";

import useStore from "hooks/useStore";

import { SoundsEmmitter } from "constants/events";

const vars = {
  trueAnswer: null,
  falseAnswer: null,
  winningGame: null,
  chooseGame: null,
  returnMenu: null,

  trueAI00: null,
  trueAI01: null,
  trueAI02: null,
  trueAI03: null,

  falseAI00: null,
  falseAI01: null,
  falseAI02: null,
  falseAI03: null,

  secondFalseAI00: null,
  secondFalseAI01: null,
};

const Sounds = () => {
  const { musicIndex, scenario } = useStore();

  const createAudio = React.useCallback(() => {
    vars.trueAnswer = new Audio("/music/RightAnswer.wav");
    vars.falseAnswer = new Audio("/music/WrongAnswer.wav");
    vars.winningGame = new Audio("/music/WinningGame.wav");
    vars.chooseGame = new Audio("/music/ChooseGame.wav");
    vars.returnMenu = new Audio("/music/ReturnMenu.wav");

    vars.trueAI00 = new Audio("/music/succesFirstTry_zero.mp3");
    vars.trueAI01 = new Audio("/music/succesFirstTry_one.mp3");
    vars.trueAI02 = new Audio("/music/succesFirstTry_two.mp3");
    vars.trueAI03 = new Audio("/music/succesFirstTry_three.mp3");

    vars.falseAI00 = new Audio("/music/falseFirstTry_zero.mp3");
    vars.falseAI01 = new Audio("/music/falseFirstTry_one.mp3");
    vars.falseAI02 = new Audio("/music/falseFirstTry_two.mp3");
    vars.falseAI03 = new Audio("/music/falseFirstTry_three.mp3");

    vars.secondFalseAI00 = new Audio("/music/falseSecondTry_zero.mp3");
    vars.secondFalseAI01 = new Audio("/music/falseSecondTry_one.mp3");
  }, []);

  React.useEffect(() => {
    createAudio();
  }, []);

  const trueAnswerSounds = [
    vars.trueAI00,
    vars.trueAI01,
    vars.trueAI02,
    vars.trueAI03,
  ];
  const falseAnswerSounds = [
    vars.falseAI00,
    vars.falseAI01,
    vars.falseAI02,
    vars.falseAI03,
  ];
  const secondFalseAnswerSounds = [vars.secondFalseAI00, vars.secondFalseAI01];

  React.useEffect(() => {
    if (scenario.place === "succesFirstTry") {
      trueAnswerSounds[musicIndex.soundIndex].play();
    } else if (scenario.place === "falseFirstTry") {
      falseAnswerSounds[musicIndex.soundIndex].play();
    } else if (scenario.place === "falseSecondTry") {
      secondFalseAnswerSounds[musicIndex.soundIndex].play();
    }
  }, [musicIndex]);

  const handleTrueAnswer = React.useCallback(() => {
    vars.trueAnswer.play();
  }, []);

  const handleFalseAnswer = React.useCallback(() => {
    vars.falseAnswer.play();
  }, []);

  const handleWinningGame = React.useCallback(() => {
    vars.winningGame.play();
  }, []);

  const handleChooseGame = React.useCallback(() => {
    vars.chooseGame.play();
  }, []);

  const handleReturnMenu = React.useCallback(() => {
    vars.returnMenu.play();
  }, []);

  React.useEffect(() => {
    SoundsEmmitter.on("true-answer", handleTrueAnswer);
    SoundsEmmitter.on("false-answer", handleFalseAnswer);
    SoundsEmmitter.on("winning-game", handleWinningGame);
    SoundsEmmitter.on("choose-game", handleChooseGame);
    SoundsEmmitter.on("return-menu", handleReturnMenu);

    return () => {
      SoundsEmmitter.off("true-answer", handleTrueAnswer);
      SoundsEmmitter.off("false-answer", handleFalseAnswer);
      SoundsEmmitter.off("winning-game", handleWinningGame);
      SoundsEmmitter.off("choose-game", handleChooseGame);
      SoundsEmmitter.off("return-menu", handleReturnMenu);
    };
  }, []);

  return null;
};

export default React.memo(Sounds);
