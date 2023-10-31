import React from "react";
import Image from "next/image";
import clsx from "clsx";

import s from "../Home.module.scss";

const detailsCounter = [
  { name: 1, id: 1, imgUrl: "/images/ivolgaDetails/01W_alpha.png" },
  { name: 2, id: 2, imgUrl: "/images/ivolgaDetails/02W_alpha.png" },
  { name: 3, id: 3, imgUrl: "/images/ivolgaDetails/03W_alpha.png" },
  { name: 4, id: 4, imgUrl: "/images/ivolgaDetails/04W_alpha.png" },
  { name: 5, id: 5, imgUrl: "/images/ivolgaDetails/05W_alpha.png" },
  { name: 6, id: 6, imgUrl: "/images/ivolgaDetails/06W_alpha.png" },
  { name: 7, id: 7, imgUrl: "/images/ivolgaDetails/07W_alpha.png" },
  { name: 8, id: 8, imgUrl: "/images/ivolgaDetails/08W_alpha.png" },
  { name: 9, id: 9, imgUrl: "/images/ivolgaDetails/09W_alpha.png" },
  { name: 10, id: 10, imgUrl: "/images/ivolgaDetails/10W_alpha.png" },
];

const DetailsVisualization = ({ currentNumber, isDone, isOutTime }) => {
  const [currentState, setCurrentState] = React.useState("");

  React.useEffect(() => {
    if (isDone) {
      const timeout = setTimeout(() => {
        setCurrentState("made-train");
      }, 2500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isDone]);
  return (
    <>
      {currentState !== "made-train" && (
        <>
          {detailsCounter.map((item) => {
            return (
              <div key={item.id}>
                {item.id === currentNumber && !isOutTime && (
                  <div key={item.id} className={s.imgWrapper}>
                    <Image
                      className={s.opacityAnimInInfinite}
                      priority
                      src={item.imgUrl}
                      width={330}
                      height={152}
                      alt=""
                    />
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
      {isDone && currentState !== "made-train" && (
        <div className={s.finalImgWrapper}>
          <img
            className={clsx(s.finalImg, s.opacityAnim)}
            src="/images/ivolgaDetails/FullGreen.png"
          ></img>
        </div>
      )}
      {isOutTime && (
        <div className={s.finalImgWrapper}>
          <img
            className={clsx(s.finalImg, s.opacityAnim)}
            src="/images/ivolgaDetails/FullRed.png"
          ></img>
        </div>
      )}
      {currentState === "made-train" && (
        <div className={clsx(s.finalImgWrapper)}>
          <img className={s.finalImg} src="/images/train/finalTrain.png"></img>
        </div>
      )}
    </>
  );
};

export default React.memo(DetailsVisualization);
