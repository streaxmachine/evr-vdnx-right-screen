import React from "react";
import { useProgress } from "@react-three/drei";

import s from "./CanvasPreloader.module.scss";

const CanvasPreloader = () => {
  const { progress } = useProgress();
  const [isPreloader, setPreloader] = React.useState(true);

  React.useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setPreloader(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [progress]);

  return (
    <>{isPreloader && <div className={s.preloader}>Загружаемся ...</div>}</>
  );
};

export default React.memo(CanvasPreloader);
