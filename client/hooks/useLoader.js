import cache from "constants/cache";
import React from "react";

import Loader from "utils/Loader/Loader";
import nextFrame from "utils/nextFrame";

const useLoader = (extras, callback) => {
  const { extraImages, extraModels } = extras;

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

      extraModels.forEach((url) => {
        loader.add("model", url, cache.models);
      });

      extraImages.forEach((url) => {
        loader.add("image", url);
      });
      images.forEach((image) => {
        loader.add("image", image.src);
      });

      loader.on(handleCallback);
      loader.start().then(() => {});
    });

    return () => {
      loader.off(handleCallback);
      loader.clear();
    };
  }, []);

  return null;
};

export default useLoader;
