import React from "react";
import {
  questionsNumbers,
  questionsRecords,
  questionsStars,
  questionsVolga,
} from "../questions";

import useData from "hooks/useData";
import clsx from "clsx";

import s from "./TouchPanel.module.scss";

const TouchPanel = () => {
  const [currentCategory, setCurrentCategory] = React.useState(0);
  const [isQuizDone, setQuizDone] = React.useState(false);
  const [time, setTime] = React.useState();
  return (
    <div className={s.root}>
      <div className={s.container}>
        {!isQuizDone && (
          <div className={s.left}>
            <button className={s.backMenu}>{"<  "}Главное меню</button>
            <TimeMenu
              time={time}
              setTime={setTime}
              setQuizDone={setQuizDone}
              isQuizDone={isQuizDone}
            />
            <WayMenu currentCategory={currentCategory} />
          </div>
        )}
        <div className={clsx(s.right, isQuizDone && s.rightDone)}>
          <Questions
            isQuizDone={isQuizDone}
            time={time}
            setQuizDone={setQuizDone}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TouchPanel);

const circles = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const places = [
  {
    name: "Волга матушка",
    id: 0,
  },
  {
    name: "Звезды в Твери",
    id: 1,
  },
  {
    name: "Цифры",
    id: 2,
  },
  {
    name: "Рекорды и факты",
    id: 3,
  },
];

const WayMenu = React.memo(({ currentCategory }) => {
  return (
    <>
      <div className={s.wayMenuRoot}>
        <div className={s.wayMenu}>
          {circles.map((item, index) => {
            return (
              <div key={index} className={clsx(s.way, {})}>
                <div
                  className={clsx(s.circle, {
                    [s.active]: item.id <= currentCategory,
                  })}
                ></div>
                {item.id !== 3 && (
                  <div
                    className={clsx(s.line, {
                      [s.active]: item.id <= currentCategory - 1,
                    })}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        <div className={s.wayMenuPlaces}>
          {places.map((item, index) => (
            <div key={index} className={s.way}>
              <div
                className={clsx(s.way, {
                  [s.activeText]: item.id <= currentCategory,
                })}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

const TimeMenu = React.memo(({ time, setTime, isQuizDone, setQuizDone }) => {
  const FULL_DASH_ARRAY = 283;
  const TIME_LIMIT = 240;
  const ref = React.useRef();

  let timeLeft = TIME_LIMIT;

  const [timePassed, setTimePassed] = React.useState(0);

  function calculateTimeFraction(time_left) {
    return time_left / TIME_LIMIT;
  }

  function setCircleDasharray(time_left) {
    const circleDasharray = `${(
      calculateTimeFraction(time_left) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;

    ref.current.setAttribute("stroke-dasharray", circleDasharray);
    return (calculateTimeFraction(time_left) * FULL_DASH_ARRAY).toFixed(0);
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `0${minutes}0:0${seconds}`;
  };

  React.useEffect(() => {
    if (!isQuizDone) {
      const timerInterval = setInterval(() => {
        setTimePassed(timePassed + 1);
        timeLeft = TIME_LIMIT - timePassed;
        setTime(formatTime(timeLeft));
        const dashArray = setCircleDasharray(timeLeft);

        if (dashArray > 256) {
          ref.current.setAttribute("color", "rgba(69, 153, 255, 1)");
        }
        if (dashArray < 120) {
          ref.current.setAttribute("color", "purple");
        }
        if (dashArray < 60) {
          ref.current.setAttribute("color", "red");
        }
        if (timeLeft === 0) {
          s;
          setTimeout(() => {
            setQuizDone(true);
          }, 500);
          // setEndQuiz(true);
        }
      }, 1000);
      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [time, isQuizDone]);

  return (
    <>
      <div className="base-timer">
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              color="rgba(69, 153, 255, 1)"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              ref={ref}
              id="base-timer-path-remaining"
              strokeDasharray="283"
              className="base-timer__path-remaining"
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">
          <p>{time}</p>
          <p className="time">Время</p>
        </span>
      </div>
    </>
  );
});

const Questions = React.memo(
  ({ currentCategory, setCurrentCategory, time, isQuizDone, setQuizDone }) => {
    const audioRef = React.useRef();
    const finalQuestions = React.useMemo(() => {
      const questions = [];

      questions.push(
        getRandomObjectsFromArray(questionsVolga),
        getRandomObjectsFromArray(questionsStars),
        getRandomObjectsFromArray(questionsNumbers),
        getRandomObjectsFromArray(questionsRecords)
      );

      return questions;
    }, [isQuizDone]);

    const buttonRef = React.useRef();
    const [score, setScore] = React.useState(0);
    const [currentQuestionNumber, setCurrentQuestionNumber] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState(
      finalQuestions[0][0]
    );
    const [questionNumber, setQuestionNumber] = React.useState(0);
    const [twoMisstakesState, setTwoMisstakesState] = React.useState(false);

    const searchRightVariant = React.useCallback(() => {
      currentQuestion.answerOptions.map((item, index) => {
        if (item.isCorrect) {
          return index;
        }
      });
    }, []);
    const [isClickable, setIsClickable] = React.useState(true);
    const [rightVariant, setRightVariant] = React.useState(
      searchRightVariant()
    );

    const sucessNumber = useData(
      {
        value: 0,
        isFirstTime: true,
        currentQestion: 0,
        test: 0,
      },
      []
    );

    React.useEffect(() => {
      if (questionNumber === 12) {
        setQuizDone(true);
      }
    }, [questionNumber]);

    React.useEffect(() => {
      currentQuestion.answerOptions.map((item, index) => {
        if (item.isCorrect) {
          setRightVariant(index);
        }
      });
    }, [currentQuestion, rightVariant]);

    const handleCheck = () => {
      if ((questionNumber + 1) % 3 === 0) {
        if (questionNumber <= 11) {
          setCurrentCategory(currentCategory + 1);
        }
        setCurrentQuestionNumber(0);
      } else {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
      }
    };

    const handleResetGame = () => {
      setQuizDone(false);
      setScore(0);
      setCurrentQuestionNumber(0);
      setCurrentCategory(0);
      setCurrentQuestion(finalQuestions[0][0]);
      setQuestionNumber(0);
      sucessNumber.test = 0;
    };

    const handleClickAnswer = (question, event, index) => {
      sucessNumber.value += 1;

      if (sucessNumber.value === 2 && question.isCorrect !== true) {
        sucessNumber.value = 0;
        setTwoMisstakesState(true);
        setIsClickable(false);
        audioRef.current.play();
        setTimeout(() => {
          setIsClickable(true);
          setQuestionNumber(questionNumber + 1);
          handleCheck();
          setTwoMisstakesState(false);
          return;
        }, 5000);
      }

      if (!twoMisstakesState) {
        if (question.isCorrect === true) {
          if (sucessNumber.value === 1) {
            sucessNumber.test += 1;
            sucessNumber.value = 0;
          } else {
            sucessNumber.value = 0;
          }
          setIsClickable(false);
          event.target.style.backgroundColor = "#3185EB";
          event.target.style.color = "white";

          const timeout = setTimeout(() => {
            setQuestionNumber(questionNumber + 1);
            handleCheck();
            setIsClickable(true);
            event.target.style.backgroundColor = "white";
            event.target.style.color = "#3185EB";
          }, 550);
        } else {
          setIsClickable(false);
          event.target.style.backgroundColor = "#B42F2F";
          event.target.style.color = "white";
          setTimeout(() => {
            setIsClickable(true);
            event.target.style.backgroundColor = "white";
            event.target.style.color = "#4599FF";
          }, 550);
        }
      }
    };

    React.useEffect(() => {
      setScore(sucessNumber.test);
    }, [questionNumber]);

    React.useEffect(() => {
      if (questionNumber <= 11) {
        setCurrentQuestion(
          finalQuestions[currentCategory][currentQuestionNumber]
        );
      }
    }, [currentCategory, currentQuestionNumber]);

    return (
      <>
        <audio ref={audioRef} src="/music/phrase.mp3" />
        {!isQuizDone && (
          <>
            <div className={s.questionRoot}>
              {/* <img src="'/images/img.png'" alt="" /> */}
              <div className={s.firstTextWrapper}>
                <div className={s.category}>
                  Категория: {currentQuestion.questionCategory}
                </div>
                <div className={s.questionNumber}>
                  Вопрос {questionNumber + 1}/12
                </div>
                <div className={s.questionText}>
                  {currentQuestion.questionText}
                </div>
              </div>

              <div className={s.answersWrapper}>
                {currentQuestion.answerOptions.map((item, index) => {
                  return (
                    <button
                      ref={buttonRef}
                      className={clsx(
                        s.answerButton,
                        !isClickable ? s.click : "",
                        {
                          [s.trueIndex]:
                            twoMisstakesState && index === rightVariant,
                          [s.falseIndex]:
                            twoMisstakesState && index !== rightVariant,
                        }
                      )}
                      onClick={(e) => handleClickAnswer(item, e, index)}
                      key={index}
                    >
                      {item.answerText}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {isQuizDone && (
          <CompleteQuiz
            time={time}
            score={score}
            questionNumber={questionNumber}
            handleReset={handleResetGame}
          />
        )}
      </>
    );
  }
);

const getRandomObjectsFromArray = (arr, count = 3) => {
  if (count > arr.length) {
    throw new Error(
      "Количество запрашиваемых объектов больше, чем длина массива."
    );
  }

  const shuffledArray = [...arr]; // Создаем копию массива
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, count);
};

const CompleteQuiz = ({
  score,
  time = "04:00",
  handleReset,
  questionNumber,
}) => {
  const percent = Math.round((score / 12) * 100);

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
            <p>Другая игра</p>
          ) : (
            <p onClick={() => handleReset()}>Начать заново</p>
          )}
        </button>
      </div>
    </div>
  );
};
