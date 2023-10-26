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
        time: formTimeSocket,
        score: questionNumber + "/12",
      })
    );
  }, []);

  React.useEffect(() => {
    time === "000:000"
      ? setScenario({ type: "quiz", place: "timesUp" })
      : setScenario({ type: "quiz", place: "gameOver" });
  }, []);

  const [currentMinutes, currentSeconds] = time.split(":").map(Number);

  const formatTime = (min, sec) => {
    let minutes, seconds;
  
    if (min === 0 && sec === 0) {
      minutes = 4;
      seconds = '00';
    } else {
      minutes = 3 - min / 10;
      seconds = 60 - sec;
    }
  
    return `0${minutes}0:0${seconds}`;
  };

  const formTime = formatTime(currentMinutes, currentSeconds);

  const formatTimeSocket = (min, sec) => {
    let minutes, seconds;
  
    if (min === 0 && sec === 0) {
      minutes = 4;
      seconds = '00';
    } else {
      minutes = 3 - min / 10;
      seconds = 60 - sec;
    }
  
    return `0${minutes}:${seconds}`;
  };

  const formTimeSocket = formatTimeSocket(currentMinutes, currentSeconds);

  // console.log(formTime, formTimeSocket);

  return (
    <div className={s.completeRoot}>
      <div className={s.completeContainer}>
        <div>
          {time === "000:000" ? (
            <img src="/images/completeSuccess/lose.svg" alt="" />
          ) : (
            <img src="/images/completeSuccess/win.svg" alt="" />
          )}
        </div>
        <p className={s.completeTitle}>Игра завершена</p>
        <div className={s.completeText}>
          {time === "000:000" ? (
            <p>
              К сожалению, время вышло! Ваш результат {percent}% правильных
              ответов. Попробуйте еще раз!
            </p>
          ) : percent >= 50 ? (
            <p>
              Вы точно не коренной тверичанин? Вы дали {percent}% правильных
              ответов. За такой грандиозный результат вам однозначно полагается
              приз! Возьмите награду у промоутера стенда!
            </p>
          ) : (
            <p>
              Не расстраивайтесь! Тверская область — удивительное место, и вы
              еще многое можете узнать о ней. Ваш результат {percent}%
              правильных ответов — отличная отправная точка для новых открытий.
              Продолжайте учиться и исследовать!
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
            <p className={s.completeValue}>{formTime}</p>
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
