import React from "react";

import s from "./ProgressBar.module.scss";

const ProgressBar = ({ setState, isBack }) => {
  const [progress, setProgress] = React.useState(0);
  const rootRef = React.useRef();

  React.useEffect(() => {
    rootRef.current.style.setProperty("--progress-width", progress + "%");
  }, [progress]);

  React.useEffect(() => {
    if (progress !== 100) {
      const interval = setInterval(() => {
        setProgress(progress + 1);
      }, 150);
      return () => {
        clearInterval(interval);
      };
    } else {
      if (isBack === false) {
        setState(4);
      } else {
        setState(2);
      }
    }
  }, [progress]);

  return (
    <>
      <main className={s.page}></main>
      <div ref={rootRef} className={s.textblock}>
        <h2 className={s.title}>{progress}%</h2>
        <span className={s.text}>Подождите, идет загрузка маршрута...</span>

        <div className={s.progressContainer}>
          <img
            src="/images/progress_bar.png"
            alt="Progress Bar"
            className={s.baseimage}
          />
          <div
            className={s.overlayimage}
            // style={progressBarStyle}
          ></div>
        </div>

        <span className={s.fact}>Fun Fact</span>
      </div>
      <section>
        <img
          className={s.img}
          src="/images/progress_putevoi.png"
          alt="Путевой дворец"
        />
      </section>
    </>
  );
};
export default ProgressBar;
