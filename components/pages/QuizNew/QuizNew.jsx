import React from "react";

import TouchPanel from "./TouchPanel";
import QuizFirstPage from "components/common/QuizFirstPage";
import QuizCards from "components/common/QuizCards";
import { useSocket } from "components/common/SocketManager/SocketManager";

import s from "./QuizNew.module.scss";

const QuizNew = () => {
  const socket = useSocket();
  const [globalState, setGlobalState] = React.useState(1);
  return (
    <>
      {globalState === 1 && <QuizFirstPage setGlobalState={setGlobalState} />}
      {globalState === 2 && <QuizCards setGlobalState={setGlobalState} />}
      {globalState === 3 && <TouchPanel setGlobalState={setGlobalState} />}
    </>
  );
};

export default QuizNew;
