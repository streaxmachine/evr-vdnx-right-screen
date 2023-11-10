import React from "react";
import { questions } from "./questions";

import useData from "hooks/useData";
import clsx from "clsx";

import CompleteQuizCow from "./CompleteQuizCow";

import s from "./TouchPanelCow/TouchPanelCow.module.scss";

const QuestionsCow = React.memo(
  ({
    time,
    isQuizDone,
    setScenario,
    socket,
    setQuizDone,
    setGlobalState,
    isShowQuestion,
    setShowQuestion,
    isShowFirstQuestion,
    setShowFirstQuestion,
    questionNumber,
    setQuestionNumber,
    setCurrentQuestionIndex,
    setPauseTimer,
    setReturn
  }) => {
    const buttonRef = React.useRef();
    const audioRef = React.useRef();

    const finalQuestions = questions;

    const [score, setScore] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState(
      finalQuestions[0]
    );
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
      [questionNumber]
    );

    React.useEffect(() => {
      if (questionNumber === 13) {
        setQuizDone(true);
        setCurrentQuestionIndex(0);
      }
    }, [questionNumber]);

    React.useEffect(() => {
      currentQuestion.answerOptions.map((item, index) => {
        if (item.isCorrect) {
          setRightVariant(index);
        }
      });
    }, [currentQuestion, rightVariant]);

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        setScenario({ type: "quiz", place: "asking" });
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }, [currentQuestion]);

    const handleCheck = () => {
      if (questionNumber >= 12) {
        setQuizDone(true);
      } else {
        setQuestionNumber(questionNumber + 1);
        setCurrentQuestion(finalQuestions[questionNumber + 1]);
        setPauseTimer(true)
      }
    };

    const handleResetGame = () => {
      setQuizDone(false);
      setScore(0);
      setCurrentQuestion(finalQuestions[0]);
      setQuestionNumber(0);
      setCurrentQuestionIndex(0);
      setPauseTimer(true)
      setShowQuestion(false)
      setShowFirstQuestion(false)
      sucessNumber.test = 0;
      setReturn(true)
    };

    const handleClickAnswer = (question, event, index) => {
      event.preventDefault();
      event.stopPropagation();
      sucessNumber.value += 1;

      if (sucessNumber.value === 2 && question.isCorrect !== true) {
        setScenario({ type: "quiz", place: "falseSecondTry" });
        sucessNumber.value = 0;
        setTwoMisstakesState(true);
        setIsClickable(false);

        setTimeout(() => {
          setIsClickable(true);
          setShowQuestion(false);
          setQuestionNumber(questionNumber + 1);
          setPauseTimer(false)
          handleCheck();
          setTwoMisstakesState(false);

          return;
        }, 3000);
      } else if (sucessNumber.value === 1 && question.isCorrect !== true) {
        setScenario({ type: "quiz", place: "falseFirstTry" });
      }

      if (!twoMisstakesState) {
        if (question.isCorrect === true) {
          if (sucessNumber.value === 1) {
            setScenario({ type: "quiz", place: "succesFirstTry" });
            setScore(score + 1);
            sucessNumber.test += 1;
            sucessNumber.value = 0;
          } else {
            setScenario({ type: "quiz", place: "succesFirstTry" });
            sucessNumber.value = 0;
          }
          setIsClickable(false);
          event.target.style.backgroundColor = "green";

          const timeout = setTimeout(() => {
            setQuestionNumber(questionNumber + 1);
            setPauseTimer(false)
            handleCheck();
            setShowQuestion(false);
            setIsClickable(true);
            event.target.style.backgroundColor = "rgba(69, 153, 255, 1)";
          }, 1500);
        } else {
          setIsClickable(false);
          event.target.style.backgroundColor = "rgb(180, 47, 47)";
          setTimeout(() => {
            setIsClickable(true);
            event.target.style.backgroundColor = "rgba(69, 153, 255, 1)";
          }, 550);
        }
      }
    };

    return (
      <>
        <audio ref={audioRef} src="/music/phrase.mp3" autoPlay={false} />

        {!isQuizDone && isShowQuestion &&  isShowFirstQuestion &&(
          <>
            <div className={`${s.questionRoot}`}>
              <div className={s.firstTextWrapper}>
                <div
                  className={clsx(s.questionText, {
                    [s.bigText]: currentQuestion.isLong,
                  })}
                >
                  {currentQuestion.questionText}
                </div>
                <div className={s.questionNumber}>
                  Вопрос {questionNumber + 1}/13
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
                          [s.bigBtnText]: item.isBigBtn,
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
          <CompleteQuizCow
            time={time}
            socket={socket}
            score={score}
            setGlobalState={setGlobalState}
            questionNumber={questionNumber}
            handleReset={handleResetGame}
          />
        )}
      </>
    );
  }
);

export default QuestionsCow;
