import React, { useState, useEffect } from "react";
import { useControls } from "leva";
import s from "./ProgressBar.module.scss";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const progressBarStyle = {
    "--progress-width": `${progress}%`,
  };

  useEffect(() => {
    const targetProgress = 100; 
    const duration = 15000; 

    const interval = duration / targetProgress;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress++;
      setProgress(currentProgress);

      if (currentProgress >= targetProgress) {
        clearInterval(timer);
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <main className={s.page}></main>
      <div className={s.textblock}>
        <h2 className={s.title}>{progress}%</h2>
        <span className={s.text}>Подождите, идет загрузка маршрута...</span>

        <div className={s.progressContainer}>
          <img
            src="/images/progress_bar.png"
            alt="Progress Bar"
            className={s.baseimage}
          />
          <div className={s.overlayimage} style={progressBarStyle}></div>
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
