import React from "react";

import { SoundsEmmitter } from "constants/events";

const vars = {
  trueAnswer: null,
  falseAnswer: null,
  winningGame: null,
  chooseGame: null,
  returnMenu: null,
  falseAI: null,
  trueAI:null,
  secondFalseAI: null
};

const Sounds = () => {
  const createAudio = React.useCallback(() => {
    vars.trueAnswer = new Audio("/music/RightAnswer.wav");
    vars.falseAnswer = new Audio("/music/WrongAnswer.wav");
    vars.winningGame = new Audio("/music/WinningGame.wav");
    vars.chooseGame = new Audio("/music/ChooseGame.wav");
    vars.returnMenu = new Audio("/music/ReturnMenu.wav");
    vars.falseAI = new Audio("/music/FalseAI.mp3");
    vars.trueAI = new Audio("/music/TrueAI.mp3");
    vars.secondFalseAI = new Audio("/music/SecondFalseAI.mp3");
  }, []);

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

  const handleTrueAI = React.useCallback(() => {
    vars.trueAI.play();
  }, []);

  const handleFalseAI = React.useCallback(() => {
    vars.falseAI.play();
  }, []);

  const handleSecondFalseAI = React.useCallback(() => {
    vars.secondFalseAI.play();
  }, []);

  React.useEffect(() => {
    createAudio();
  }, []);

  React.useEffect(() => {
    SoundsEmmitter.on("true-answer", handleTrueAnswer);
    SoundsEmmitter.on("false-answer", handleFalseAnswer);
    SoundsEmmitter.on("winning-game", handleWinningGame);
    SoundsEmmitter.on("choose-game", handleChooseGame);
    SoundsEmmitter.on("return-menu", handleReturnMenu);
    SoundsEmmitter.on("true-ai", handleTrueAI);
    SoundsEmmitter.on("false-ai", handleFalseAI);
    SoundsEmmitter.on("second-false-ai", handleSecondFalseAI);

    return () => {
      SoundsEmmitter.off("true-answer", handleTrueAnswer);
      SoundsEmmitter.off("false-answer", handleFalseAnswer);
      SoundsEmmitter.off("winning-game", handleWinningGame);
      SoundsEmmitter.off("choose-game", handleChooseGame);
      SoundsEmmitter.off("return-menu", handleReturnMenu);
      SoundsEmmitter.off("true-ai", handleTrueAI);
      SoundsEmmitter.off("false-ai", handleFalseAI);
      SoundsEmmitter.off("second-false-ai", handleSecondFalseAI);
    };
  }, []);

  return null;
};

export default React.memo(Sounds);
