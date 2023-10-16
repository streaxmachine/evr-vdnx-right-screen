import React from "react";

import TouchPanel from "./TouchPanel";
import QuizFirstPage from "components/common/QuizFirstPage";
import QuizCards from "components/common/QuizCards";
import QuizRules from "components/common/QuizRules";
import { useSocket } from "components/common/SocketManager/SocketManager";

import s from "./QuizNew.module.scss";


const QuizNew = () => {
  const socket = useSocket();
  const [globalState, setGlobalState] = React.useState('firstPage');
  return (
    <>
      {globalState === 'firstPage' && <QuizFirstPage setGlobalState={setGlobalState} />}
      {globalState === 'quizCards' && <QuizCards setGlobalState={setGlobalState} />}
      {globalState === 'quizRules' && <QuizRules setGlobalState={setGlobalState} />}
      {globalState === 'touchPanel' && <TouchPanel setGlobalState={setGlobalState} />}
    </>
  );
};

export default QuizNew;
