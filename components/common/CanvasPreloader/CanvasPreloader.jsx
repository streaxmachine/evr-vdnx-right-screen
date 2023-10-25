import React from "react";
import { useProgress } from "@react-three/drei";

import s from "./CanvasPreloader.module.scss";

const CanvasPreloader = () => {
  const { progress } = useProgress();
  const [isPreloader, setPreloader] = React.useState(true);

  const [preloaderProgress, setPreloaderProgress] = React.useState(
    progress / 2
  );

  React.useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setPreloader(false);
      }, 1500);

      const interval = setInterval(() => {
        setPreloaderProgress((prev) => Math.min(prev + 2, 100));
      }, 30);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [progress, preloaderProgress]);

  return (
    <>
      {isPreloader && (
        <Preloader progress={preloaderProgress} />
      )}
    </>
  );
};

export default React.memo(CanvasPreloader);

function Preloader({ progress }) {
  const rootRef = React.useRef();
  React.useEffect(() => {
    rootRef.current.style.setProperty("--progress-width", progress + "%");
  }, [progress]);
  return (
    <>
      <div className={s.root}>
        <div className={s.wrapper}>
          <div ref={rootRef} className={s.textblock}>
            <h2 className={s.title}>{progress}%</h2>
            <span className={s.text}>Подождите, идет загрузка игры...</span>

            <div className={s.progressContainer}>
              <img
                src="/images/progress/Union1.svg"
                alt="Progress Bar"
                className={s.baseimage}
              />
              <div className={s.overlayimage}></div>
            </div>

          </div>
        </div>
      </div>
      <div className={s.clouds}></div>
    </>
  );
}
