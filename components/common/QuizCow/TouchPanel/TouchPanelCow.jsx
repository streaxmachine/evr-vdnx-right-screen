import React from "react";
import clsx from "clsx";

import TimeMenu from "../TimeMenu";
import QuestionsCow from "../QuestionsCow";

import useStore from "hooks/useStore";

import s from "./TouchPanelCow.module.scss";
import gsap from "gsap";
import { SoundsEmmitter } from "constants/events";

const points = [
  { percent: 0, url: "URL_1" },
  { percent: 9.9, url: "URL_2" },
  { percent: 18.9, url: "URL_3" },
  { percent: 25.9, url: "URL_4" },
  { percent: 38, url: "URL_5" },
  { percent: 55.5, url: "URL_6" },
  { percent: 63, url: "URL_7" },
  { percent: 68.5, url: "URL_8" },
  { percent: 78, url: "URL_9" },
  { percent: 83, url: "URL_10" },
  { percent: 90, url: "URL_11" },
  { percent: 95, url: "URL_12" },
  { percent: 100, url: "URL_13" },
];

const TouchPanelCow = ({ setGlobalState, socket }) => {
  const [isQuizDone, setQuizDone] = React.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [isPointClicked, setIsPointClicked] = React.useState(true);
  const [isShowQuestion, setShowQuestion] = React.useState(true);
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [dashOffset, setDashOffset] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowQuestion(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isShowQuestion]);
  // const currentQuestion = finalQuestions[currentQuestionIndex];

  let dashOffsetNumber;

  React.useEffect(() => {
    if (questionNumber == 0) {
      dashOffsetNumber = 4200 - 1;
    } else if (questionNumber == 1) {
      dashOffsetNumber = 4200 - 380;
    } else if (questionNumber == 2) {
      dashOffsetNumber = 4200 - 780;
    } else if (questionNumber == 3) {
      dashOffsetNumber = 4200 - 1000;
    } else if (questionNumber == 4) {
      dashOffsetNumber = 4200 - 1600;
    } else if (questionNumber == 5) {
      dashOffsetNumber = 4200 - 2250;
    } else if (questionNumber == 6) {
      dashOffsetNumber = 4200 - 2550;
    } else if (questionNumber == 7) {
      dashOffsetNumber = 4200 - 2750;
    } else if (questionNumber == 8) {
      dashOffsetNumber = 4200 - 3200;
    } else if (questionNumber == 9) {
      dashOffsetNumber = 4200 - 3400;
    } else if (questionNumber == 10) {
      dashOffsetNumber = 4200 - 3650;
    } else if (questionNumber == 11) {
      dashOffsetNumber = 4200 - 3900;
    } else if (questionNumber == 12) {
      dashOffsetNumber = 4200 - 4200;
    }

    gsap.to(ref.current, {
      duration: 1.75,
      delay: 0.2,
      "stroke-dashoffset": dashOffsetNumber,
      ease: "power2.inOut",
    });
  }, [questionNumber]);

  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);
  const { setScenario } = useStore();

  const ref = React.useRef();

  return (
    <div className={s.root}>
      <div className={s.container}>
        {!isQuizDone && (
          <>
            <div className={s.header}>
              <button
                onClick={() => {
                  setGlobalState("firstPage");
                  SoundsEmmitter.send("return-menu");

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
                <img src="/images/aiChat/arrow.png" alt="Назад" />
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
                  stroke="#424242"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="4200"
                  shapeRendering="geometricPrecision"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className={s.path}
                />
                <path
                  d="M175 79.1803C179.012 79.1803 433.215 265.278 536.5 299.181C664.178 341.09 792.489 285.316 822.369 217.034C823.884 213.572 826.097 210.246 829.225 208.124C899.309 160.559 911.244 389.47 1028 385.677C1289.5 377.18 1340 -54.3216 1199 52.6764C1134.84 101.362 1329 648.177 1115 691.68C1044.67 705.978 892 540.68 838.5 556.68C785 572.68 733 722.68 669 691.68C605 660.68 573.5 487.68 480.5 500.68C387.5 513.68 344.365 672.072 279 691.68C204 714.18 15 697.18 37.5002 585.68C46.4961 541.1 196 543.68 175 482.68C154 421.68 11.5002 402.18 37.5002 368.18"
                  className={s.pathBlue}
                  strokeWidth="7"
                  ref={ref}
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
  const pointRef = React.useRef(null);

  React.useEffect(() => {
    if (questionNumber === number) {
      gsap.to(pointRef.current, {
        duration: 0.2,
        scale: 1.25,
        delay: 1.25,
        onComplete: () => {
          pointRef.current, { duration: 0.25, scale: 1.0 };
        },
      });
    } else {
      gsap.to(pointRef.current, {
        duration: 0.25,
        scale: 1,
      });
    }
  }, [questionNumber, number]);
  return (
    <div
      className={s.point}
      ref={pointRef}
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
          style={{
            opacity: questionNumber >= number ? 1 : 0,
          }}
          className={s.pathButton}
          src="/images/quizCow/gold.png"
          alt="point"
        />
        <span className={s.buttonNumber}>{number + 1}</span>
      </div>
    </div>
  );
};
