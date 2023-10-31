import React from "react";
import clsx from "clsx";

import TimeMenu from "../TimeMenu";
import QuestionsCow from "../QuestionsCow";

import useStore from "hooks/useStore";

import s from "./TouchPanelCow.module.scss";


const TouchPanelCow = ({ setGlobalState, socket }) => {
  const [isQuizDone, setQuizDone] = React.useState(false);
  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);
  const { setScenario } = useStore();

  return (
    <div className={s.root}>
      <div className={s.container}>
        {!isQuizDone && (
          <div className={s.left}>
            <button
              onClick={() => {
                setGlobalState("firstPage");
                socket.send(
                  JSON.stringify({
                    installation: "right",
                    type: "mode",
                    data: "puzzle_start",
                  })
                );
              }}
              className={s.backMenu}
            >
              <img src="/images/arrow.png" alt="Назад" />
              <span className={s.backText}>Главное меню</span>
            </button>
            <TimeMenu
              time={time}
              setTime={setTime}
              setQuizDone={setQuizDone}
              isQuizDone={isQuizDone}
            />
          </div>
        )}
        <div
          className={clsx(s.right, isQuizDone && s.rightDone)}        
        >
          <QuestionsCow
            isQuizDone={isQuizDone}
            socket={socket}
            time={time}
            setScenario={setScenario}
            setQuizDone={setQuizDone}
            setGlobalState={setGlobalState}
          />
          <img className={s.cowIMG} src="/images/QuizCowRules/cow.png" alt="Корова" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TouchPanelCow);


