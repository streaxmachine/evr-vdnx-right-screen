import React from "react";
import gsap from "gsap";

import { phrases } from "./phrases";

import s from "./ProgressBar.module.scss";

const ProgressBar = ({ setState, isBack }) => {
  const [progress, setProgress] = React.useState(0);
  const rootRef = React.useRef();

  const [text, setText] = React.useState(phrases[0]);
  const randomPhraseRef = React.useRef();

  React.useEffect(() => {
    gsap.to(rootRef.current, {
      duration: 0.25,
      "--progress-width": progress + "%",
      ease: "power2.inOut",
    });
    // rootRef.current.style.setProperty("--progress-width", progress + "%");
  }, [progress]);

  React.useEffect(() => {
    if (progress !== 100) {
      const interval = setInterval(() => {
        setProgress(progress + 2);
      }, 100);
      return () => {
        clearInterval(interval);
      };
    } else {
      // null;
      const timeout = setTimeout(() => {
        if (isBack === false) {
          setState("onway");
        } else {
          setState("hero");
        }
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [progress]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomPhrase = Math.floor(Math.random() * phrases.length);

      gsap.to(randomPhraseRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => setText(phrases[randomPhrase]),
      });
      gsap.to(randomPhraseRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
      });
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div className={s.page}></div>
      <div className={s.pageLayer}></div>
      <div className={s.root}>
        <div className={s.wrapper}>
          <div ref={rootRef} className={s.textblock}>
            <h2 className={s.title}>{progress}%</h2>
            <span className={s.text}>Подождите, идет загрузка маршрута...</span>

            <div className={s.progressContainer}>
              <img
                src="/images/progress/Union1.svg"
                alt="Progress Bar"
                className={s.baseimage}
              />
              <img
                src="/images/progress/Union2.svg"
                alt="Progress Bar"
                className={s.overlayimage}
              />
            </div>

            <span className={s.fact} ref={randomPhraseRef}>
              {text}
            </span>
          </div>

          <div className={s.imgWrapper}>
            <img
              className={s.img}
              src="/images/progress/progress_putevoi.png"
              alt="Путевой дворец"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProgressBar;
