import React, { useState, useEffect } from "react";
import { useSocket } from "components/common/SocketManager/SocketManager";

import s from "./Quiz.module.scss";

import {
  questionsVolga,
  questionsStars,
  questionsNumbers,
} from "./questionsArray";

const Quiz = () => {
  const socket = useSocket();
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  // Функция для генерации случайных уникальных индексов вопросов
  const getRandomIndexes = (maxIndex, count) => {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * maxIndex);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  useEffect(() => {
    const randomIndexesVolga = getRandomIndexes(questionsVolga.length, 3);
    const randomIndexesStars = getRandomIndexes(questionsStars.length, 3);
    const randomIndexesNumbers = getRandomIndexes(questionsNumbers.length, 3);

    const selectedQuestions = [
      ...randomIndexesVolga.map((index) => questionsVolga[index]),
      ...randomIndexesStars.map((index) => questionsStars[index]),
      ...randomIndexesNumbers.map((index) => questionsNumbers[index]),
    ];

    setSelectedQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  }, []);

  const handleAnswerOptionClick = (isCorrect, answerText) => {
    if (!answered) {
      setSelectedAnswer(answerText);
      setAnswered(true);
      setButtonsDisabled(true);
      if (isCorrect) {
        setScore(score + 1);
      }
      setTimeout(() => {
        setSelectedAnswer(null);
        setAnswered(false);
        setButtonsDisabled(false);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < selectedQuestions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
        }
      }, 2000);
    }
  };

  const handleSendSocket = (info) => {
    // socket.emit("test", { info });
  };

  const handleResetClick = () => {
    const randomIndexesVolga = getRandomIndexes(questionsVolga.length, 3);
    const randomIndexesStars = getRandomIndexes(questionsStars.length, 3);
    const randomIndexesNumbers = getRandomIndexes(questionsNumbers.length, 3);

    const selectedQuestions = [
      ...randomIndexesVolga.map((index) => questionsVolga[index]),
      ...randomIndexesStars.map((index) => questionsStars[index]),
      ...randomIndexesNumbers.map((index) => questionsNumbers[index]),
    ];

    setSelectedQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };
  return (
    <>
      {/* <SocketManager /> */}
      <div className={s.app}>
        {showScore ? (
          <>
            <div className={s.scoreSection}>
              <div className={s.scoreText}>
                Вы ответили правильно
                <p>
                  на {score} из {selectedQuestions.length} вопросов
                </p>
              </div>
              <button onClick={handleResetClick} className={s.scoreButton}>
                Вернуться
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={s.quizContainer}>
              <div className={s.leftPart}></div>
              <div className={s.rightPart}>
                <div className={s.questionSection}>
                  <div className={s.questionCategory}>
                    Категория:{" "}
                    {selectedQuestions[currentQuestion]?.questionCategory}
                  </div>
                  <div className={s.questionCount}>
                    <span>Вопрос: {currentQuestion + 1}</span>/9
                  </div>
                  <div className={s.questionText}>
                    {selectedQuestions[currentQuestion]?.questionText}
                  </div>
                  <img
                    src={selectedQuestions[currentQuestion]?.bgIMG}
                    className={s.answerBG}
                    alt="Category Background"
                  ></img>
                </div>
                <div className={s.answerSection}>
                  {selectedQuestions[currentQuestion]?.answerOptions.map(
                    (answerOption, index) => (
                      <button
                        key={index}
                        className={`${s.btn} ${s.btnOne} ${s.btnSep}`}
                        onClick={() =>
                          handleAnswerOptionClick(
                            answerOption.isCorrect,
                            answerOption.answerText
                          )
                        }
                        style={{
                          backgroundColor:
                            answered &&
                            answerOption.answerText === selectedAnswer
                              ? answerOption.isCorrect
                                ? "rgba(49, 133, 235, 1)"
                                : "rgba(180, 47, 47, 1)"
                                : "white",
                          color:
                            answered &&
                            answerOption.answerText === selectedAnswer
                              ? "white"
                              : "rgba(69, 153, 255, 1)",
                          opacity: buttonsDisabled  ? 0.6 : 1,
                        }}
                        disabled={buttonsDisabled}
                      >
                        {answerOption.answerText}
                      </button>
                    )
                  )}
                </div>
                <div className={s.aiSection}>
                  <img src="/images/Union.png" className={s.aiZig} />
                  <div className={s.aiChat} />
                  <div className={s.speechBubble}>
                    AI comment AI comment AI comment AI comment AI comment{" "}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
