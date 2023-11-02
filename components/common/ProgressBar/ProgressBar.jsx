import React from "react";
import gsap from "gsap";

import s from "./ProgressBar.module.scss";

const ProgressBar = ({ setState, isBack, location }) => {
  const [progress, setProgress] = React.useState(0);
  const rootRef = React.useRef();

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
      }, 40);
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

  let text;

  if (location === "1") {
    text =
      "А вы знали, что Великая княгиня Екатерина Павловна устраивала во дворце такие балы, что однажды Александр I назвал его «маленьким Петергофом»";
  } else if (location === "2") {
    text =
      "А вы знали, что Мультимедийный исторический парк «Россия - Моя история»  - это один из самых масштабных мультимедийных парков в нашей стране";
  } else if (location === "3") {
    text =
      "А вы знали, что скульптура Советскому солдату в центре Ржевского мемориала состоит из 600 частей. Вес каждой превышает 100 кг.";
  }

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

          {/* <div className={s.imgWrapper}>
            <img
              className={s.img}
              src="/images/progress/progress_putevoi.png"
              alt="Путевой дворец"
            />
          </div> */}
        </div>
      </div>
    </>
  );
};
export default ProgressBar;
