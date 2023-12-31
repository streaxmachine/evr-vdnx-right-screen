import { useEffect, useState } from "react";

export default function useTimer(setState, state, time = 30) {
  const [inactiveTime, setInactiveTime] = useState(0);

  const resetInactiveTime = () => {
    setInactiveTime(0);
  };

  useEffect(() => {
    const touchStartHandler = () => {
      console.log("reset");
      resetInactiveTime();
    };

    const touchMoveHandler = () => {
      console.log("reset");
      resetInactiveTime();
    };

    const timer = setInterval(() => {
      setInactiveTime(inactiveTime + 1);
    }, 1000);

    window.addEventListener("touchstart", touchStartHandler);
    window.addEventListener("touchmove", touchMoveHandler);

    return () => {
      clearInterval(timer);
      window.removeEventListener("touchstart", touchStartHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
    };
  }, [inactiveTime]);

  useEffect(() => {
    if (inactiveTime >= time) {
      setState(state);
    }
  }, [inactiveTime]);
}
