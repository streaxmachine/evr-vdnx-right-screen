import React from "react";

import usePrevious from "./usePrevious";

const useChangeEffect = (callback, param) => {
  const callbackRef = React.useRef(callback);
  const prevParam = usePrevious(param);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    let result = () => {};

    if (param !== prevParam) {
      result = callbackRef.current(param);
    }

    return () => {
      result && result();
    };
  }, [param, prevParam]);
};

export default useChangeEffect;
