import React from "react";
import clsx from "clsx";
import gsap from "gsap";

import TimeMenu from "../TimeMenu";
import QuestionsPig from "../QuestionsPig";

import useStore from "hooks/useStore";

import { SoundsEmmitter } from "constants/events";

import s from "./TouchPanelPig.module.scss";

const points = [
  { percent: 0, url: "URL_1" },
  { percent: 9.9, url: "URL_2" },
  { percent: 18.9, url: "URL_3" },
  { percent: 25.9, url: "URL_4" },
  { percent: 43, url: "URL_5" },
  { percent: 55.5, url: "URL_6" },
  { percent: 63, url: "URL_7" },
  { percent: 68.5, url: "URL_8" },
  { percent: 78, url: "URL_9" },
  { percent: 83, url: "URL_10" },
  { percent: 90, url: "URL_11" },
  { percent: 100, url: "URL_12" },
  ,
];

const TouchPanelPig = ({ setGlobalState, socket }) => {
  const [isQuizDone, setQuizDone] = React.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [isShowQuestion, setShowQuestion] = React.useState(false);
  const [isShowFirstQuestion, setShowFirstQuestion] = React.useState(false);
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [pauseTimer, setPauseTimer] = React.useState(true);
  const [isReturned, setReturn] = React.useState(false);

  const ref = React.useRef();
  const refOrange = React.useRef(null);
  const refGrey = React.useRef(null);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowQuestion(true);
      setPauseTimer(false);
    }, 4500);

    return () => {
      clearTimeout(timeout);
    };
  }, [isShowQuestion]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFirstQuestion(true);
      setPauseTimer(false);
    }, 7000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isShowFirstQuestion]);

  let dashOffsetNumber = 4200;

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
      dashOffsetNumber = 4200 - 1400;
    } else if (questionNumber == 5) {
      dashOffsetNumber = 4200 - 1950;
    } else if (questionNumber == 6) {
      dashOffsetNumber = 4200 - 2200;
    } else if (questionNumber == 7) {
      dashOffsetNumber = 4200 - 2450;
    } else if (questionNumber == 8) {
      dashOffsetNumber = 4200 - 2800;
    } else if (questionNumber == 9) {
      dashOffsetNumber = 4200 - 3000;
    } else if (questionNumber == 10) {
      dashOffsetNumber = 4200 - 3350;
    } else if (questionNumber == 11) {
      dashOffsetNumber = 4200 - 3800;
    }
    gsap.to(ref.current, {
      duration: 3,
      delay: 0.2,
      "stroke-dashoffset": dashOffsetNumber,
      ease: "power2.inOut",
    });
  }, [questionNumber]);

  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);
  const { setScenario } = useStore();

  const restartAnimations = () => {
    refOrange.current.classList.remove(s.animatedPathOrange);
    refGrey.current.classList.remove(s.animatedPathGrey);
    ref.current.classList.remove(s.pathOrange);

    const timeOut = setTimeout(() => {
      refGrey.current.classList.add(s.animatedPathGrey);
      refOrange.current.classList.add(s.animatedPathOrange);
      ref.current.classList.add(s.pathOrange);
    }, 10);

    return () => clearTimeout(timeOut);
  };

  React.useEffect(() => {
    if (isReturned) {
      restartAnimations();

      const timeOut = setTimeout(() => {
        setReturn(false);
      });

      return () => clearTimeout(timeOut);
    }
  }, [isReturned]);

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
                <img src="/images/arrow.png" alt="Назад" />
                <span className={s.backText}>Главное меню</span>
              </button>
              <section className={s.headerLogo}>
                <img
                  src="/images/QuizCowRules/Coral_logo.png"
                  alt=""
                  style={{
                    width: "228px",
                    height: "266px",
                    transform: "translateY(-58rem)",
                  }}
                />
              </section>
              <TimeMenu
                time={time}
                setTime={setTime}
                setQuizDone={setQuizDone}
                isQuizDone={isQuizDone}
                pauseTimer={pauseTimer}
              />
            </div>
          </>
        )}

        <div className={s.progressRoot}>
          <div className={s.pathPointsWrapper}>
            <PathPointsWrapper
              points={points}
              questionNumber={questionNumber}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
          </div>
          <div className={s.pathWrapper}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1311"
                height="736"
                viewBox="0 0 1311 736"
                fill="none"
              >
                <path
                  d="M176 35.1797C180.012 35.1797 434.215 221.277 537.5 255.18C665.178 297.089 793.489 241.315 823.369 173.034C824.884 169.571 827.097 166.246 830.225 164.123C900.309 116.559 912.244 345.47 1029 341.676C1290.5 333.179 1248 89.5 1186 167.68C1115.11 257.066 1330 604.176 1116 647.68C1045.67 661.978 893 496.68 839.5 512.68C786 528.68 734 678.68 670 647.68C606 616.68 574.5 443.68 481.5 456.68C388.5 469.68 345.365 628.071 280 647.68C205 670.179 16 653.179 38.5002 541.679C47.4961 497.1 197 499.679 176 438.679C155 377.679 12.5002 358.18 38.5002 324.18"
                  stroke="#424242"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="4200"
                  shapeRendering="geometricPrecision"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className={s.pathGrey}
                />

                <path
                  d="M176 35.1797C180.012 35.1797 434.215 221.277 537.5 255.18C665.178 297.089 793.489 241.315 823.369 173.034C824.884 169.571 827.097 166.246 830.225 164.123C900.309 116.559 912.244 345.47 1029 341.676C1290.5 333.179 1248 89.5 1186 167.68C1115.11 257.066 1330 604.176 1116 647.68C1045.67 661.978 893 496.68 839.5 512.68C786 528.68 734 678.68 670 647.68C606 616.68 574.5 443.68 481.5 456.68C388.5 469.68 345.365 628.071 280 647.68C205 670.179 16 653.179 38.5002 541.679C47.4961 497.1 197 499.679 176 438.679C155 377.679 12.5002 358.18 38.5002 324.18"
                  stroke="#ffaa00"
                  strokeWidth="7"
                  className={s.animatedPathOrange}
                  ref={refOrange}
                />
                <path
                  d="M176 35.1797C180.012 35.1797 434.215 221.277 537.5 255.18C665.178 297.089 793.489 241.315 823.369 173.034C824.884 169.571 827.097 166.246 830.225 164.123C900.309 116.559 912.244 345.47 1029 341.676C1290.5 333.179 1248 89.5 1186 167.68C1115.11 257.066 1330 604.176 1116 647.68C1045.67 661.978 893 496.68 839.5 512.68C786 528.68 734 678.68 670 647.68C606 616.68 574.5 443.68 481.5 456.68C388.5 469.68 345.365 628.071 280 647.68C205 670.179 16 653.179 38.5002 541.679C47.4961 497.1 197 499.679 176 438.679C155 377.679 12.5002 358.18 38.5002 324.18"
                  stroke="#424242"
                  strokeWidth="7"
                  className={s.animatedPathGrey}
                  ref={refGrey}
                />
                <path
                  d="M176 35.1797C180.012 35.1797 434.215 221.277 537.5 255.18C665.178 297.089 793.489 241.315 823.369 173.034C824.884 169.571 827.097 166.246 830.225 164.123C900.309 116.559 912.244 345.47 1029 341.676C1290.5 333.179 1248 89.5 1186 167.68C1115.11 257.066 1330 604.176 1116 647.68C1045.67 661.978 893 496.68 839.5 512.68C786 528.68 734 678.68 670 647.68C606 616.68 574.5 443.68 481.5 456.68C388.5 469.68 345.365 628.071 280 647.68C205 670.179 16 653.179 38.5002 541.679C47.4961 497.1 197 499.679 176 438.679C155 377.679 12.5002 358.18 38.5002 324.18"
                  className={s.pathOrange}
                  strokeWidth="7"
                  ref={ref}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={clsx(isQuizDone && s.rightDone)}>
          <QuestionsPig
            isShowQuestion={isShowQuestion}
            setShowQuestion={setShowQuestion}
            isShowFirstQuestion={isShowFirstQuestion}
            setShowFirstQuestion={setShowFirstQuestion}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            isQuizDone={isQuizDone}
            socket={socket}
            time={time}
            setScenario={setScenario}
            setQuizDone={setQuizDone}
            setGlobalState={setGlobalState}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setPauseTimer={setPauseTimer}
            setReturn={setReturn}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TouchPanelPig);

const PathPointsWrapper = ({
  points,
  questionNumber,
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
  const [golden, setGolden] = React.useState(false);
  const [flashNumber, setFlashNumber] = React.useState(false);

  React.useEffect(() => {
    if (questionNumber === number) {
      gsap.to(pointRef.current, {
        scale: 1.4,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(pointRef.current, {
            scale: 0.2,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(pointRef.current, {
                scale: 1.2,
                duration: 0.6,
                ease: "power2.inOut",
              });
            },
          });
        },
      });
    } else {
      gsap.to(pointRef.current, {
        duration: 0.25,
        scale: 1,
      });
    }
  }, [questionNumber, number]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setGolden(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  React.useEffect(() => {
    if (number === 0) {
      const flashInterval = setInterval(() => {
        setFlashNumber((prev) => !prev);
      }, 500);

      setTimeout(() => {
        clearInterval(flashInterval);
        setFlashNumber(false);
      }, 3000);
    }
  }, [number]);

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
            opacity: questionNumber >= number && golden ? 1 : 0,
          }}
          className={s.pathButton}
          src="/images/quizCow/gold.png"
          alt="point"
        />
        <span
          className={`${s.buttonNumber} ${number === 0 ? s.highlight : ""}`}
        >
          {number + 1}
        </span>
      </div>
    </div>
  );
};
