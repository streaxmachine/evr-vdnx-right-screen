import React from "react";

import useStore from "hooks/useStore";

import s from "./Timer.module.scss";

const Timer = React.memo(
  ({ time, setTime, isQuizDone = false, setQuizDone = false }) => {
    const FULL_DASH_ARRAY = 283;
    const TIME_LIMIT = 240;
    const ref = React.useRef();
    const { setScenario } = useStore();

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

          if (timeLeft === 60) {
            setScenario({ type: "ivolga", place: "time60" });
          }

          if (timeLeft === 120) {
            setScenario({ type: "ivolga", place: "time120" });
          }

          if (timeLeft === 160) {
            setScenario({ type: "ivolga", place: "time160" });
          }

          // if (timeLeft)
          if (dashArray > 256) {
            ref.current.setAttribute("color", "white");
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
        <div className={s.root}>
          <svg
            className={s.svg}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className={s.circle}>
              <circle
                fill="lightblue"
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
                color="white"
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
          <span id="base-timer-label" className={s.timer__label}>
            <p>{time}</p>
            <p className={s.time}>Время</p>
          </span>
        </div>
      </>
    );
  }
);
export default Timer;
