import React from "react";

import TouchPanel from "./TouchPanel";
import QuizFirstPage from "components/common/QuizFirstPage";
import QuizCards from "components/common/QuizCards";
import QuizRules from "components/common/QuizRules";

import { useSocket } from "hooks/useSocket";
import useStore from "hooks/useStore";

import s from "./QuizNew.module.scss";

const QuizNew = () => {
  const socket = useSocket();
  const { isLoaded } = useStore();
  // console.log(isLoaded);
  const [globalState, setGlobalState] = React.useState("all");
  console.log(globalState);
  React.useEffect(() => {
    if (isLoaded) {
      setGlobalState("firstPage");
    }
  }, [isLoaded]);
  return (
    <>
      {(globalState === "firstPage" || globalState === "all") && (
        <QuizFirstPage setGlobalState={setGlobalState} socket={socket} />
      )}
      {(globalState === "quizCards" || globalState === "all") && (
        <QuizCards setGlobalState={setGlobalState} socket={socket} />
      )}
      {(globalState === "quizRules" || globalState === "all") && (
        <QuizRules setGlobalState={setGlobalState} socket={socket} />
      )}
      {globalState === "touchPanel" && (
        <TouchPanel setGlobalState={setGlobalState} socket={socket} />
      )}
      <div className={s.aiSection}>
        <div className={s.aiChat} />
      </div>
    </>
  );
};

export default QuizNew;
