import React from "react";

import TouchPanel from "./TouchPanel";
import QuizFirstPage from "components/common/QuizFirstPage";
import QuizCards from "components/common/QuizCards";
import QuizRules from "components/common/QuizRules";

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
      <FakeAi />
    </>
  );
};

export default QuizNew;
