import React from "react";
import delay from "lodash/delay";

import Loader from "utils/Loader/Loader";
import nextFrame from "utils/nextFrame";

const useLoader = (extras, callback, delayMs = 0) => {
  const { extraImages } = extras;

  const vars = React.useMemo(
    () => ({
      callback: () => {},
    }),
    []
  );

  const handleCallback = React.useCallback((data) => {
    vars.callback(data);
  }, []);

  React.useEffect(() => {
    vars.callback = callback;
  }, [callback]);

  React.useEffect(() => {
    let loader = null;

    nextFrame(() => {
      loader = new Loader();
      const images = [...document.getElementsByTagName("img")];
      console.log(images);

      extraImages.forEach((url) => {
        loader.add("image", url);
      });

      images.forEach((image) => {
        loader.add("image", image.src);
      });

      loader.on(handleCallback);

      delay(() => {
        loader.start().then((data) => handleCallback(data));
      }, delayMs);
    });

    return () => {
      loader?.off(handleCallback);
      loader?.clear();
    };
  }, []);

  return null;
};

export default useLoader;
