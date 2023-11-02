import React from "react";
import { questions } from "./questions";

import useData from "hooks/useData";
import clsx from "clsx";

import CompleteQuizCow from "./CompleteQuizCow";

import s from "./TouchPanel/TouchPanelCow.module.scss";

const QuestionsCow = React.memo(
  ({ time, isQuizDone, setScenario, socket, setQuizDone, setGlobalState }) => {
    const buttonRef = React.useRef();
    const audioRef = React.useRef();

    const finalQuestions = questions;

    const [score, setScore] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState(
      finalQuestions[0]
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
      [questionNumber]
    );

    React.useEffect(() => {
      if (questionNumber === 13) {
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

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        setScenario({ type: "quiz", place: "asking" });
      }, 300);

      // socket.send(
      //   JSON.stringify({
      //     installation: "right",
      //     type: "puzzle",
      //     data: `question_${questionNumber}`,
      //     state: null,
      //     id: Number(currentQuestion.id),
      //   })
      // );

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
      }
    };

    const handleResetGame = () => {
      setQuizDone(false);
      setScore(0);
      setCurrentQuestion(finalQuestions[0]);
      setQuestionNumber(0);
      sucessNumber.test = 0;
    };

    const handleClickAnswer = (question, event, index) => {
      event.preventDefault();
      event.stopPropagation();
      sucessNumber.value += 1;

      // socket.send(
      //   JSON.stringify({
      //     installation: "right",
      //     type: "puzzle",
      //     data: `question_${questionNumber}`,
      //     state: question.isCorrect,
      //     variant: index,
      //   })
      // );

      if (sucessNumber.value === 2 && question.isCorrect !== true) {
        setScenario({ type: "quiz", place: "falseSecondTry" });
        sucessNumber.value = 0;
        setTwoMisstakesState(true);
        setIsClickable(false);
        // audioRef.current.play();

        // currentQuestion.answerOptions.forEach((answer, questionIndex) => {
        //   if (answer.isCorrect) {
        //     setTimeout(() => {
        //       socket.send(
        //         JSON.stringify({
        //           installation: "right",
        //           type: "puzzle",
        //           data: `question_${questionNumber}`,
        //           state: answer.isCorrect,
        //           variant: questionIndex,
        //         })
        //       );
        //     }, 300);
        //   }
        // });

        setTimeout(() => {
          setIsClickable(true);
          setQuestionNumber(questionNumber + 1);
          handleCheck();
          setTwoMisstakesState(false);
          return;
        }, 5000);
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
            handleCheck();
            setIsClickable(true);
            event.target.style.backgroundColor = "rgba(69, 153, 255, 1)";
          }, 500);
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

    React.useEffect(() => {
      // setScore(sucessNumber.test);
      console.log(score);
    }, [questionNumber]);

    return (
      <>
        <audio ref={audioRef} src="/music/phrase.mp3" autoPlay={false} />

        {!isQuizDone && (
          <>
            <div className={s.questionRoot}>
              <div className={s.firstTextWrapper}>
                <div className={s.questionNumber}>
                  Вопрос {questionNumber + 1}/13
                </div>
                <div
                  className={clsx(s.questionText, {
                    [s.bigText]: currentQuestion.isLong,
                  })}
                >
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
