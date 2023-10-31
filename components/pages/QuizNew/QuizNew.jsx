import React from "react";

import TouchPanel from "./TouchPanel";
import QuizFirstPage from "components/common/QuizFirstPage";
import QuizCards from "components/common/QuizCards";
import QuizRules from "components/common/QuizRules";
import IvolgaRules from "components/common/IvolgaRules";
import QuizCowRules from "components/common/QuizCowRules";
import TouchPanelCow from "components/common/QuizCow/TouchPanel/TouchPanelCow";

import Home from "../Home";

import { useSocket } from "hooks/useSocket";
import useStore from "hooks/useStore";

import s from "./QuizNew.module.scss";
import FakeAi from "components/common/FakeAi";

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

      <div className={s.aiSection}>
        <div className={s.aiChat} />
      </div>
      <FakeAi />
    </>
  );
};

export default QuizNew;
