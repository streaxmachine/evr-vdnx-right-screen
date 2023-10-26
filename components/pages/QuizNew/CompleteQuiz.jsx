import React from "react";

import useStore from "hooks/useStore";

import s from "./TouchPanel/TouchPanel.module.scss";

const CompleteQuiz = ({
  score,
  socket,
  time = "04:00",
  setGlobalState,
  handleReset,
  questionNumber,
}) => {
  const { setScenario } = useStore();

  const percent = Math.round((score / 12) * 100);

  React.useEffect(() => {
    socket.send(
      JSON.stringify({
        installation: "right",
        type: "victorina",
        data: `final`,
        true_answers: percent,
        time: time,
        score: questionNumber + "/12",
      })
    );
  }, []);

  React.useEffect(() => {
    console.log(time);
    time === "000:000"
      ? setScenario({ type: "quiz", place: "timesUp" })
      : setScenario({ type: "quiz", place: "gameOver" })
  }, []);

  return (
    <div className={s.completeRoot}>
      <div className={s.completeContainer}>
        <div>
          {percent > 50 ? (
            <img src="/images/completeSuccess/win.svg" alt="" />
          ) : (
            <img src="/images/completeSuccess/lose.svg" alt="" />
          )}
        </div>
        <p className={s.completeTitle}>Игра завершена</p>
        <div className={s.completeText}>
          {percent > 50 ? (
            <p>
              Вы точно не коренной тверичанин? Вы дали {percent}% правильных
              ответов. За такой грандиозный результат вам однозначно полагается
              приз! Возьмите награду у промоутера стенда!
            </p>
          ) : (
            <p>
              К сожалению, время вышло! Ваш результат {percent}% правильных
              ответов. Попробуйте еще раз!
            </p>
          )}
        </div>
        <div className={s.completeResults}>
          <div className={s.completeStatistick}>
            <p>Правильных ответов</p>
            <p className={s.completeValue}>{percent}%</p>
          </div>
          <div className={s.completeRectangle}></div>
          <div className={s.completeStatistick}>
            <p>Затраченное время</p>
            <p className={s.completeValue}>{time}</p>
          </div>
          <div className={s.completeRectangle}></div>

          <div className={s.completeStatistick}>
            <p>Дано ответов</p>
            <p className={s.completeValue}>{questionNumber + "/12"}</p>
          </div>
        </div>
        <button className={s.completeOtherGameBtn}>
          {percent > 50 ? (
            <p
              onClick={() => {
                setGlobalState("quizCards");
                socket.send(
                  JSON.stringify({
                    installation: "right",
                    type: "mode",
                    data: `splashscreen`,
                  })
                );
              }}
            >
              Другая игра
            </p>
          ) : (
            <p onClick={() => handleReset()}>Начать заново</p>
          )}
        </button>
      </div>
      <div className={s.clouds}></div>
    </div>
  );
};
export default CompleteQuiz;
