import { useEffect, useState } from "react";

import useStore from "./useStore";

export default function useScenarioTimer(
  type,
  place,
  time = 30,
  disableTimer = false
) {
  const [inactiveTime, setInactiveTime] = useState(0);
  const { setScenario } = useStore();

  const resetInactiveTime = () => {
    setInactiveTime(0);
  };

  useEffect(() => {
    const touchStartHandler = () => {
      resetInactiveTime();
    };

    const touchMoveHandler = () => {
      resetInactiveTime();
    };

    const timer = setInterval(() => {
      setInactiveTime(inactiveTime + 1);
    }, 1000);

    window.addEventListener("touchstart", touchStartHandler);
    window.addEventListener("touchmove", touchMoveHandler);
    // window.addEventListener("mousemove", touchMoveHandler);

    return () => {
      clearInterval(timer);
      window.removeEventListener("touchstart", touchStartHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
      //   window.addEventListener("mousemove", touchMoveHandler);
    };
  }, [inactiveTime]);

  useEffect(() => {
    if (!disableTimer) {
      if ((inactiveTime % time) + 1 === time) {
        setScenario({ type: type, place: place });
      }
    }
  }, [inactiveTime, disableTimer]);
}
