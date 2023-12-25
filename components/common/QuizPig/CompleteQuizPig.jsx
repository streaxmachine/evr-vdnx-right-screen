import React from "react";

import useStore from "hooks/useStore";

import s from "./TouchPanelPig/TouchPanelPig.module.scss";

const makePhraseWithProcent = (scenario, percent) => {
  if (scenario === 1) {
    return `Вы дошли до финала! Спасибо за участие в игре. Ваш процент правильных ответов:  ${percent}%`;
  } else if (scenario === 2) {
    return `Вот и финиш! Вы достойно справились. Ваш процент правильных ответов: ${percent}%`;
  } else if (scenario === 3) {
    return `Поздравляю! Вы прекрасно преодолели все испытания. Ваш результат: ${percent}%`;
  } else if (scenario === 4) {
    return `Игра завершена! Вы отлично справились. Вы дали ${percent}% правильных ответов.`;
  }
};

const CompleteQuizPig = ({
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

    if (seconds < 10 && seconds >= 1) {
      seconds = `0${seconds}`;
    }

    return {
      normal: `0${minutes}0:0${seconds}`,
      socket: `0${minutes}:${seconds}`,
    };
  };

  const formTime = formatTime(currentMinutes, currentSeconds);

  // React.useEffect(() => {
  //   socket.send(
  //     JSON.stringify({
  //       installation: "right",
  //       type: "puzzle",
  //       data: `final`,
  //       true_answers: percent,
  //       time: formTime.socket,
  //       score: questionNumber + "/12",
  //     })
  //   );
  // }, []);

  const phraseNumber = React.useMemo(() => {
    if (percent < 50) {
      return 1;
    } else if (percent < 65) {
      return 2;
    } else if (percent < 85) {
      return 3;
    } else if (percent <= 100) {
      return 4;
    }
  }, [percent]);

  React.useEffect(() => {
    if (time === "000:000") {
      setScenario({ type: "quiz", place: "timeIsOut" });
    } else {
      if (score === 11) {
        setScenario({ type: "quiz", place: "best" });
      } else if (score < 11 && score >= 8) {
        setScenario({ type: "quiz", place: "good" });
      } else if (score <= 7 && score >= 5) {
        setScenario({ type: "quiz", place: "bad" });
      } else {
        setScenario({ type: "quiz", place: "worst" });
      }
    }
  }, [time, score]);

  const formatTimeSocket = (min, sec) => {
    let minutes, seconds;

    if (min === 0 && sec === 0) {
      minutes = 4;
      seconds = "00";
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
        {percent > 50 ? (
          <button
            className={s.completeOtherGameBtn}
            onClick={() => handleReset()}
          >
            <>
              <p
                onClick={() => {
                  setGlobalState("quizCards");
                  socket.send(
                    JSON.stringify({
                      installation: "right",
                      type: "mode",
                      data: `menu`,
                    })
                  );
                }}
              >
                Другая игра
              </p>
            </>
          </button>
        ) : (
          <>
            <button
              className={s.completeOtherGameBtn}
              onClick={() => handleReset()}
            >
              <p>Начать заново</p>
            </button>
            <button
              className={`${s.completeOtherGameBtn} ${s.blueButton}`}
              onClick={() => handleReset()}
            >
              <p
                onClick={() => {
                  setGlobalState("quizCards");
                  socket.send(
                    JSON.stringify({
                      installation: "right",
                      type: "mode",
                      data: "menu",
                    })
                  );
                }}
              >
                Главное меню
              </p>
            </button>
          </>
        )}
      </div>
      <div className={s.clouds}></div>
      {/* <FakeAi /> */}
    </div>
  );
};
export default CompleteQuizPig;
