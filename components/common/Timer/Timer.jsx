import React from "react";

import useStore from "hooks/useStore";

import s from "./Timer.module.scss";

const Timer = React.memo(
  ({
    time,
    setTime,
    isQuizDone = false,
    setQuizDone = false,
    resetGame,
    setTimeEndGame,
    setIsOutTime,
    isOutTime,
  }) => {
    const FULL_DASH_ARRAY = 283;
    const TIME_LIMIT = 60;
    const ref = React.useRef();
    const refCircle = React.useRef();
    const { setScenario } = useStore();

    let timeLeft = TIME_LIMIT;

    const [timePassed, setTimePassed] = React.useState(0);
    const [timeIsUp, setTimeIsUp] = React.useState(false);

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
      console.log(isOutTime);
      if (!isQuizDone && !isOutTime) {
        const timerInterval = setInterval(() => {
          setTimePassed(timePassed + 1);
          timeLeft = TIME_LIMIT - timePassed;
          setTime(formatTime(timeLeft));
          const dashArray = setCircleDasharray(timeLeft);

          if (timeLeft === 60) {
            setScenario({ type: "ivolga", place: "time60" });
          }

          if (timeLeft === 15) {
            setScenario({ type: "ivolga", place: "time15" });
          }

          if (timeLeft === 120) {
            setScenario({ type: "ivolga", place: "time120" });
          }

          // if (timeLeft)
          if (dashArray > 256) {
            ref.current.setAttribute("color", "var(--light-blue)");
          }
          if (dashArray < 128) {
            ref.current.setAttribute("color", "#2b47d6");
          }
          if (dashArray < 64) {
            ref.current.setAttribute("color", "purple");
          }
          if (dashArray < 32) {
            ref.current.setAttribute("color", "var(--maroon)");
          }
          if (timeLeft === 0) {
            setTimeout(() => {
              // setQuizDone(true);
              ref.current.setAttribute("color", "rgba(255, 255, 255, 0.0)");
              refCircle.current.setAttribute("fill", "var(--maroon)");
              setIsOutTime(true);
              setTimeIsUp(true);
            }, 500);
            // setEndQuiz(true);
          }
        }, 1000);
        return () => {
          clearInterval(timerInterval);
        };
      }
    }, [time, isQuizDone, isOutTime]);

    React.useEffect(() => {
      if (isQuizDone && TIME_LIMIT - timePassed > 1) {
        setTimeIsUp(true);
        ref.current.setAttribute("color", "rgba(255, 255, 255, 0.0)");
        refCircle.current.setAttribute("fill", "var(--light-blue)");
      }
    }, [isQuizDone, time]);

    return (
      <>
        <div className={s.root}>
          <svg
            className={s.svg}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className={s.circle}>
              <circle
                ref={refCircle}
                fill="rgba(255, 255, 255, 0.4)"
                className={s.path_elapsed}
                color="rgba(69, 153, 255, 1)"
                cx="50"
                cy="50"
                r="45"
              ></circle>
              <path
                ref={ref}
                id="base-timer-path-remaining"
                strokeDasharray="283"
                color="white"
                className={s.path_remaining}
                d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
              ></path>
            </g>
          </svg>
          <span
            id="base-timer-label"
            className={`${s.timer_label} ${timeIsUp ? s.white_text : ""} ${
              isOutTime && s.outTime
            }`}
          >
            <p>{time}</p>
            <p className={s.time}>Время</p>
          </span>
        </div>
      </>
    );
  }
);
export default Timer;
