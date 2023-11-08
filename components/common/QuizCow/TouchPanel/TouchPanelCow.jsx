import React from "react";
import clsx from "clsx";

import TimeMenu from "../TimeMenu";
import QuestionsCow from "../QuestionsCow";

import useStore from "hooks/useStore";

import s from "./TouchPanelCow.module.scss";

const points = [
  { percent: 0, url: "URL_1" },
  { percent: 8.3, url: "URL_2" },
  { percent: 16.6, url: "URL_3" },
  { percent: 24.9, url: "URL_4" },
  { percent: 33.2, url: "URL_5" },
  { percent: 42, url: "URL_6" },
  { percent: 49.8, url: "URL_7" },
  { percent: 58.1, url: "URL_8" },
  { percent: 66.4, url: "URL_9" },
  { percent: 74.7, url: "URL_10" },
  { percent: 83, url: "URL_11" },
  { percent: 91.3, url: "URL_12" },
  { percent: 100, url: "URL_13" },
];

const TouchPanelCow = ({ setGlobalState, socket }) => {
  const [isQuizDone, setQuizDone] = React.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [isPointClicked, setIsPointClicked] = React.useState(true);
  const [isShowQuestion, setShowQuestion] = React.useState(true);
  const [questionNumber, setQuestionNumber] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowQuestion(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isShowQuestion]);
  // const currentQuestion = finalQuestions[currentQuestionIndex];

  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);
  const { setScenario } = useStore();

  const ref = React.useRef();

  return (
    <div className={s.root}>
      <div className={s.container}>
        {!isQuizDone && (
          <>
            <div className={s.left}>
              <button
                onClick={() => {
                  setGlobalState("firstPage");
                  socket.send(
                    JSON.stringify({
                      installation: "right",
                      type: "mode",
                      data: "menu",
                    })
                  );
                }}
                className={s.backMenu}
              >
                <span className={s.arrow}>{"<"}</span>
                <span className={s.backText}>Главное меню</span>
              </button>

              <TimeMenu
                time={time}
                setTime={setTime}
                setQuizDone={setQuizDone}
                isQuizDone={isQuizDone}
              />
            </div>
          </>
        )}

        <div className={s.progressRoot}>
          <div className={s.onWayPointsWrapper}>
            <OnWayPointsWrapper
              points={points}
              questionNumber={questionNumber}
              setIsPointClicked={setIsPointClicked}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
          </div>
          <div className={s.progressWrapper}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1311"
                height="736"
                viewBox="0 0 1311 736"
                fill="none"
              >
                <path
                  d="M175 79.1803C179.012 79.1803 433.215 265.278 536.5 299.181C664.178 341.09 792.489 285.316 822.369 217.034C823.884 213.572 826.097 210.246 829.225 208.124C899.309 160.559 911.244 389.47 1028 385.677C1289.5 377.18 1340 -54.3216 1199 52.6764C1134.84 101.362 1329 648.177 1115 691.68C1044.67 705.978 892 540.68 838.5 556.68C785 572.68 733 722.68 669 691.68C605 660.68 573.5 487.68 480.5 500.68C387.5 513.68 344.365 672.072 279 691.68C204 714.18 15 697.18 37.5002 585.68C46.4961 541.1 196 543.68 175 482.68C154 421.68 11.5002 402.18 37.5002 368.18"
                  stroke="black"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="1 18"
                  shapeRendering="geometricPrecision"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
                <path
                  d="M175 79.1803C179.012 79.1803 433.215 265.278 536.5 299.181C664.178 341.09 792.489 285.316 822.369 217.034C823.884 213.572 826.097 210.246 829.225 208.124C899.309 160.559 911.244 389.47 1028 385.677C1289.5 377.18 1340 -54.3216 1199 52.6764C1134.84 101.362 1329 648.177 1115 691.68C1044.67 705.978 892 540.68 838.5 556.68C785 572.68 733 722.68 669 691.68C605 660.68 573.5 487.68 480.5 500.68C387.5 513.68 344.365 672.072 279 691.68C204 714.18 15 697.18 37.5002 585.68C46.4961 541.1 196 543.68 175 482.68C154 421.68 11.5002 402.18 37.5002 368.18"
                  ref={ref}
                  className={s.pathBlue}
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="1 18"
                  shapeRendering="geometricPrecision"
                  fillRule="nonzero"
                  style={{ offsetDistance: 22 + "%" }}
                  fill="url(#paint0_linear_299_9740)"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={clsx(isQuizDone && s.rightDone)}>
          {/* {isShowQuestion && ( */}
          <QuestionsCow
            isShowQuestion={isShowQuestion}
            setShowQuestion={setShowQuestion}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            isQuizDone={isQuizDone}
            socket={socket}
            time={time}
            setScenario={setScenario}
            setQuizDone={setQuizDone}
            setGlobalState={setGlobalState}
            setIsPointClicked={setIsPointClicked}
            isPointClicked={isPointClicked}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TouchPanelCow);

const OnWayPointsWrapper = ({
  points,
  questionNumber,
  setIsPointClicked,
  setCurrentQuestionIndex,
  currentQuestionIndex,
}) => {
  return (
    <>
      {points.map((point, id) => {
        return (
          <Point
            key={id}
            questionNumber={questionNumber}
            point={point}
            number={id}
            setIsPointClicked={setIsPointClicked}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
          />
        );
      })}
    </>
  );
};

const Point = ({ point, number, questionNumber }) => {
  return (
    <div
      className={s.point}
      style={{
        offsetDistance: point.percent + "%",
      }}
      key={point.percent}
    >
      <div className={s.buttonContainer}>
        <img
          className={s.pathButton}
          src="/images/quizCow/silver.png"
          alt="point"
        />
        <img
          style={{ opacity: questionNumber >= number ? 1 : 0 }}
          className={s.pathButton}
          src="/images/quizCow/gold.png"
          alt="point"
        />
        <span className={s.buttonNumber}>{number + 1}</span>
      </div>
    </div>
  );
};
