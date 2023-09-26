import React, { useState, useEffect } from "react";

import s from "./Quiz.module.scss";

const Quiz = () => {
  const questionsVolga = [
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 1?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 2?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 3?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 4?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 5?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 6?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 7?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 8?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 9?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionCategory: "Волга-матушка",
      questionText: "Question 10?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
  ];

  const questionsStars = [
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 11?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 12?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 13?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 14?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 15?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 16?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 17?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 18?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 19?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionCategory: "Звезды в Твери",
      questionText: "Question 20?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
  ];

  const questionsNumbers = [
    {
      questionCategory: "Цифры ТО",
      questionText: "Question 21?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionCategory: "Цифры ТО",
      questionText: "Question 22?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionCategory: "Цифры ТО",
      questionText: "Question 23?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionText: "Question 24?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionCategory: "Цифры ТО",
      questionText: "Question 25?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionCategory: "Цифры ТО",
      questionText: "Question 26?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionCategory: "Цифры ТО",
      questionText: "Question 27?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionCategory: "Цифры ТО",
      questionText: "Question 28?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionCategory: "Цифры ТО",
      questionText: "Question 29?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
    {
      questionCategory: "Цифры ТО",
      questionText: "Question 30?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
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

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < selectedQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
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
            <div className={s.questionSection}>
              <div className={s.questionCategory}>
                Категория {selectedQuestions[currentQuestion]?.questionCategory}
              </div>
              <div className={s.questionCount}>
                <span>Вопрос {currentQuestion + 1}</span>/9
              </div>
              <div className={s.questionText}>
                {selectedQuestions[currentQuestion]?.questionText}
              </div>
            </div>
            <div className={s.answerSection}>
              {selectedQuestions[currentQuestion]?.answerOptions.map(
                (answerOption, index) => (
                  <button
                    key={index}
                    className={`${s.btn} ${s.btnOne} ${s.btnSep}`}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
