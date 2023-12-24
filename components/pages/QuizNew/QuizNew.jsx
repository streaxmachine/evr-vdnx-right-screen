import React from "react";

import TouchPanel from "./TouchPanel";
import QuizFirstPage from "components/common/QuizFirstPage";
import QuizCards from "components/common/QuizCards";
import QuizRules from "components/common/QuizRules";
import IvolgaRules from "components/common/IvolgaRules";
import QuizCowRules from "components/common/QuizCowRules";
import TouchPanelCow from "components/common/QuizCow/TouchPanelCow/TouchPanelCow";
import TouchPanelPig from "components/common/QuizPig/TouchPanelPig";
import AiChat from "components/common/aiChat";
import Sounds from "components/common/Sounds";
import FakeAi from "components/common/FakeAi";

import Home from "../Home";

import { useSocket } from "hooks/useSocket";
import useStore from "hooks/useStore";

import s from "./QuizNew.module.scss";


const QuizNew = () => {
  const socket = useSocket();
  const { isLoaded } = useStore();
  const [globalState, setGlobalState] = React.useState("firstPage");
  React.useEffect(() => {
    if (isLoaded) {
      setGlobalState("firstPage");
    }
  }, [isLoaded]);
  return (
    <>
      <div className={s.root}>
        {globalState === "firstPage" && (
          <QuizFirstPage setGlobalState={setGlobalState} socket={socket} />
        )}
        {globalState === "quizCards" && (
          <QuizCards setGlobalState={setGlobalState} socket={socket} />
        )}
        {globalState === "quizRules" && (
          <QuizRules setGlobalState={setGlobalState} socket={socket} />
        )}
        {globalState === "touchPanel" && (
          <TouchPanel setGlobalState={setGlobalState} socket={socket} />
        )}
        {globalState === "ivolgaRules" && (
          <IvolgaRules setGlobalState={setGlobalState} socket={socket} />
        )}
        {globalState === "quizCowRules" && (
          <QuizCowRules setGlobalState={setGlobalState} socket={socket} />
        )}
        {globalState === "touchPanelCow" && (
          <TouchPanelCow setGlobalState={setGlobalState} socket={socket} />
        )}
        {globalState === "touchPanelPig" && (
          <TouchPanelPig setGlobalState={setGlobalState} socket={socket} />
        )}
        {globalState === "aiChat" && (
          <AiChat setGlobalState={setGlobalState} socket={socket} />
        )}

        {globalState === "firstPage" ||
        globalState === "quizCards" ||
        globalState === "quizRules" ||
        globalState === "touchPanel" ||
        globalState === "ivolgaRules" ||
        globalState === "quizCowRules" ? (
          <>
            <div className={s.aiSection}>
              <div className={s.aiChat} />
            </div>
            <FakeAi />
          </>
        ) : null}

        <Sounds />
      </div>
    </>
  );
};

export default QuizNew;
