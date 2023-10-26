import React from "react";
import { useProgress } from "@react-three/drei";

import s from "./CanvasPreloader.module.scss";
import { setRequestMeta } from "next/dist/server/request-meta";

let fakeProgress = 0;
const CanvasPreloader = () => {
  const { progress } = useProgress();
  const [isPreloader, setPreloader] = React.useState(true);
  const [fakeProgress, setFakeProgress] = React.useState(0);
  const [preloaderProgress, setPreloaderProgress] = React.useState(0);

  React.useEffect(() => {
    if (fakeProgress !== 50) {
      const interval = setInterval(() => {
        setFakeProgress(fakeProgress + 1);
      }, 25);
      return () => {
        clearInterval(interval);
      };
    }
  }, [fakeProgress]);

  React.useEffect(() => {
    setPreloaderProgress(progress / 2 + fakeProgress);

    if (preloaderProgress === 100) {
      const timeout = setTimeout(() => {
        setPreloader(false);
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [progress, fakeProgress, preloaderProgress]);

  // console.log(isPreloader)

  return <>{isPreloader && <Preloader progress={preloaderProgress} />}</>;
};

export default React.memo(CanvasPreloader);

function Preloader({ progress }) {
  const rootRef = React.useRef();
  React.useEffect(() => {
    rootRef.current.style.setProperty("--progress-width", progress + "%");
  }, [progress]);
  return (
    <>
      <div className={s.preloader}>
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
              <img
                src="/images/progress/Union2.svg"
                alt="Progress Bar"
                className={s.overlayImg}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={s.clouds}></div>
    </>
  );
}
