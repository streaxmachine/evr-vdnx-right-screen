import React from "react";

import s from "./TouchPanel/TouchPanelCow.module.scss";

const TimeMenu = React.memo(({ time, setTime, isQuizDone, setQuizDone }) => {
  const FULL_DASH_ARRAY = 283;
  const TIME_LIMIT = 240;
  const ref = React.useRef();

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

        if (dashArray > 256) {
          ref.current.setAttribute("color", "var(--light-blue)");
        }
        if (dashArray < 140) {
          ref.current.setAttribute("color", "#2b47d6");
        }
        if (dashArray < 70) {
          ref.current.setAttribute("color", "purple");
        }
        if (dashArray < 35) {
          ref.current.setAttribute("color", "var(--maroon)");
        }
        if (timeLeft === 0) {
          setTimeout(() => {
            ref.current.setAttribute("color", "rgba(255, 255, 255, 0.0)");
            setQuizDone(true);
          }, 500);
        }
      }, 1000);
      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [time, isQuizDone]);

  return (
    <>
      <div className={s.base_timer}>
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className={s.base_timer__circle}>
            <circle
              className={s.base_timer__path_elapsed}
              color="rgba(69, 153, 255, 1)"
              fill="rgba(255, 255, 255, 0.9)"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              ref={ref}
              id="base-timer__path-remaining"
              strokeDasharray="283"
              color="white"
              className={`${s.base_timer__path_remaining} base-timer__path-remaining`}
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
          className={`${s.base_timer__label} base-timer-label`}
        >
          <p style={{ fontSize: "28rem" }}>{time}</p>
          <p className="time">Время</p>
        </span>
      </div>
    </>
  );
});
export default TimeMenu;
