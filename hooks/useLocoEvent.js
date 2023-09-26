import React from "react";
import ScrollContext from "contexts/ScrollContext";

const useLocoEvent = (event, callback) => {
  const callbackRef = React.useRef(null);
  const scroll = React.useContext(ScrollContext);

  const handleCallback = React.useCallback((event, state) => {
    callbackRef?.current(event,state);
  }, []);

  React.useEffect(() => {
    scroll?.on(event, handleCallback);

    return () => {
      scroll?.off(event, handleCallback);
    };
  }, [event, scroll, handleCallback]);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return null;
};

export default useLocoEvent;
