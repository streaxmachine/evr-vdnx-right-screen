import React from "react";
import {
  questionsNumbers,
  questionsRecords,
  questionsStars,
  questionsVolga,
} from "./questions";

import useData from "hooks/useData";
import clsx from "clsx";

import CompleteQuiz from "./CompleteQuiz";

import s from "./TouchPanel/TouchPanel.module.scss";

const Questions = React.memo(
  ({
    currentCategory,
    setCurrentCategory,
    time,
    isQuizDone,
    setQuizDone,
    setGlobalState,
  }) => {
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
      event.preventDefault();
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
          event.target.style.backgroundColor = "green";
          // event.target.style.color = "white";

          const timeout = setTimeout(() => {
            setQuestionNumber(questionNumber + 1);
            handleCheck();
            setIsClickable(true);
            event.target.style.backgroundColor = "rgba(69, 153, 255, 1)";
            // event.target.style.color = "white";
          }, 550);
        } else {
          setIsClickable(false);
          event.target.style.backgroundColor = "rgb(180, 47, 47)";
          // event.target.style.color = "white";
          setTimeout(() => {
            setIsClickable(true);
            event.target.style.backgroundColor = "rgba(69, 153, 255, 1)";
            // event.target.style.color = "white";
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
            setGlobalState={setGlobalState}
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

export default Questions;
