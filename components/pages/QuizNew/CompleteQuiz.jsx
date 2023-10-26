import React from "react";

import useStore from "hooks/useStore";

import s from "./TouchPanel/TouchPanel.module.scss";

const phrases = [
  "Вы дошли до финала! Спасибо за участие в игре. Ваш процент правильных ответов:  .  Получите подарок у сотрудника стенда!",
  "Вот и финиш! Вы достойно справились. Ваш процент правильных ответов: ___. За участие вам полагается приз! Вы можете получить его у сотредника стенда!",
  "Поздравляю! Вы прекрасно преодолели все испытания. Ваш результат: ___. Обязательно заберите награду за свои старания у сотрудника стенда!",
  "Поздравляю! Вы прекрасно преодолели все испытания. Ваш результат: ___. Обязательно заберите награду за свои старания у сотрудника стенда!",
];

const makePhraseWithProcent = (scenario, percent) => {
  if (scenario === 1) {
    return `Вы дошли до финала! Спасибо за участие в игре. Ваш процент правильных ответов:  ${percent}%.  Получите подарок у сотрудника стенда!`;
  } else if (scenario === 2) {
    return `Вот и финиш! Вы достойно справились. Ваш процент правильных ответов: ${percent}%. За участие вам полагается приз! Вы можете получить его у сотредника стенда!`;
  } else if (scenario === 3) {
    return `Поздравляю! Вы прекрасно преодолели все испытания. Ваш результат: ${percent}%. Обязательно заберите награду за свои старания у сотрудника стенда!`;
  } else if (scenario === 4) {
    return `Игра завершена! Вы точно не коренной тверичанин? Вы дали ${percent}% правильных ответов. За такой грандиозный результат вам однозначно полагается приз! Возьмите награду у сотрудника стенда!`;
  }
};

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

  const [currentMinutes, currentSeconds] = time.split(":").map(Number);

  const formatTime = (min, sec) => {
    let minutes, seconds;

    if (min === 0 && sec === 0) {
      minutes = 4;
      seconds = "00";
    } else {
      minutes = 3 - min / 10;
      seconds = 60 - sec;
    }

    return {
      normal: `0${minutes}0:0${seconds}`,
      socket: `0${minutes}:${seconds}`,
    };
  };

  const formTime = formatTime(currentMinutes, currentSeconds);

  React.useEffect(() => {
    socket.send(
      JSON.stringify({
        installation: "right",
        type: "victorina",
        data: `final`,
        true_answers: percent,
        time: formTime.socket,
        score: questionNumber + "/12",
      })
    );
  }, []);

  const phraseNumber = React.useMemo(() => {
    if (percent < 50) {
      return 1;
    } else if (percent < 65) {
      return 2;
    } else if (percent < 85) {
      return 3;
    } else if (percent < 100) {
      return 4;
    }
  }, [percent]);

  React.useEffect(() => {
    time === "000:000"
      ? setScenario({ type: "quiz", place: "timeIsOut" })
      : setScenario({ type: "quiz", place: "results" });
  }, [time]);

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
            `К сожалению, время вышло! Ваш результат ${percent}% правильных ответов. Попробуйте еще раз!`
          ) : (
            <>{makePhraseWithProcent(phraseNumber, percent)}</>
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
            <p className={s.completeValue}>{formTime.normal}</p>
          </div>
          <div className={s.completeRectangle}></div>

          <div className={s.completeStatistick}>
            <p>Дано ответов</p>
            <p className={s.completeValue}>{questionNumber + "/12"}</p>
          </div>
        </div>
        <button
          className={s.completeOtherGameBtn}
          onClick={() => handleReset()}
        >
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
            <p>Начать заново</p>
          )}
        </button>
      </div>
      <div className={s.clouds}></div>
    </div>
  );
};
export default CompleteQuiz;
