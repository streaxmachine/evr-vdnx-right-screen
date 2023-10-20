import { useEffect, useState } from "react";

export default function useTimer() {
  const [inactive, setInactive] = useState(false);
  const [inactiveTime, setInactiveTime] = useState(0);

  const resetInactiveTime = () => {
    setInactiveTime(0);
  };

  useEffect(() => {
    const touchStartHandler = () => {
      resetInactiveTime();
      setInactive(false)
    };

    const touchMoveHandler = () => {
      resetInactiveTime();
      setInactive(false)
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
    if (inactiveTime >= 30) {
      setInactive(true)
    }
  }, [inactiveTime]);

  return {
    inactive
  };
}
