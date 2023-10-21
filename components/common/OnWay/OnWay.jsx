import React, { useState } from "react";
import { useControls } from "leva";

import s from "./OnWay.module.scss";
import FactIcons from "./factIcons";

const OnWay = ({
  setState,
  socket,
  speedSocket = 0,
  caloriesSocket = 0,
  distanceSocket = 0,
  setDistance,
  setSpeed,
  setisBack,
}) => {
  const [filledCells, setFilledCells] = useState(0);
  const rootRef = React.useRef();
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    setSpeed(0);
    setDistance(0);
  }, []);

  React.useEffect(() => {
    setProgress(distanceSocket);
    if (Number(progress) === 100) {
      const timeout = setTimeout(() => {
        setState("lastStep");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [progress, distanceSocket]);

  const isSlow = speedSocket < 20;
  const isOkay = speedSocket > 19 && speedSocket < 41;
  const isFast = speedSocket > 40;

  React.useEffect(() => {
    const newFilledCells = Math.floor((speedSocket / 48) * 28); // 48 - максимальное значение speedSocket, 28 - количество ячеек
    setFilledCells(newFilledCells);
  }, [speedSocket]);

  React.useEffect(() => {
    rootRef.current.style.setProperty("--progress", progress + "%");
  }, [progress]);

  const rays = Array.from({ length: 28 }, (_, index) => {
    const isFilled = index < filledCells;
    const isRed =
      (speedSocket < 20 && isFilled) || (speedSocket > 40 && !isFilled);

    return (
      <div
        className={`${s.ray} ${isFilled ? s.filled : ""} ${isRed ? s.red : ""}`}
        style={{
          transform: `rotate(${
            (220 / 27) * index - 110
          }deg) translateY(-240rem)`,
        }}
        key={index}
      ></div>
    );
  });

  // {isFast && (
  //   <div className={s.notification}>
  //     <img
  //       src="/images/onway/warning.png"
  //       alt="Progress Bar"
  //       className={s.notificationImage}
  //     />
  //     <span className={s.notificationText}>Cбавь скорость</span>
  //   </div>
  // )}
  // {isOkay && (
  //   <div className={s.notification}>
  //     <img
  //       src="/images/onway/tick.png"
  //       alt="Progress Bar"
  //       className={s.notificationImage}
  //     />
  //     <span className={s.notificationText}>Идеальная скорость</span>
  //   </div>
  // )}

  return (
    <>
      <main ref={rootRef} className={s.root}>
        <div className={s.rootWrapper}>
          <button
            className={s.backBtn}
            onClick={() => {
              setisBack(true);
              setState("progressBar");
              socket.send(
                JSON.stringify({
                  installation: "velo",
                  type: "level",
                  data: "splashscreen",
                })
              );
            }}
          >
            <img className={s.arrow} src="/images/arrow.png" alt="Назад" />{" "}
            <span className={s.backText}>Главное меню</span>
          </button>
          <div className={s.dataRoot}>
            {isSlow && (
              <div className={s.notification}>
                <img
                  src="/images/onway/warning.png"
                  alt="Progress Bar"
                  className={s.notificationImage}
                />
                <span className={s.notificationText}>Ускорься</span>
              </div>
            )}
            <div className={s.dataWrapper}>
              <div className={s.ccal}>
                <p className={s.dataTitle}>Калории</p>
                <p className={s.dataNumber}>{distanceSocket * 0.1}</p>
                <p className={s.dataMeasure}>ккал</p>
              </div>
              <div className={s.speed}>
                <p className={s.dataTitle}>Скорость</p>
                <p className={s.speedNumber}>{speedSocket}</p>
                <p className={s.dataMeasure}>км/ч</p>
              </div>
              <div className={s.dist}>
                <p className={s.dataTitle}>Расстояние</p>
                <p className={s.dataNumber}>{distanceSocket}</p>
                <p className={s.dataMeasure}>км</p>
              </div>
            </div>
          </div>
          <div className={s.speedometer}>
            <div className={s.sunRays}>{rays}</div>
          </div>
          <div className={s.route}>
            <span className={s.textStart}>Начало маршрута</span>
            <span className={s.textEnd}>Тверской императорский дворец</span>
          </div>
          <div className={s.progressRoot}>
            <div className={s.progressWrapper}>
              <img
                src="/images/onway/on_way_progress.png"
                alt="Progress Bar"
                className={s.baseimage}
              />
              {/* <div className={s.overlayimage} style={progressBarStyle}></div> */}

              <div className={s.iconContainer}>
                <svg
                  className={s.item}
                  width="56"
                  height="54"
                  viewBox="0 0 56 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="28"
                    cy="27"
                    rx="28"
                    ry="27"
                    fill="#58B9FF"
                    fillOpacity="0.4"
                  />
                  <circle
                    cx="28"
                    cy="27"
                    r="20"
                    fill="white"
                    fillOpacity="0.6"
                  />
                  <circle cx="28" cy="27" r="11" fill="#4599FF" />
                </svg>
              </div>

              <svg
                opacity={0}
                width="852"
                height="27"
                viewBox="0 0 852 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 14H62L82 26L120 1L160 26L198 1L237 26L276.5 1L314.5 26L353 1L393 26L430 1L470 26L508 1L546 26L586 1L624 26L662 1L702 26L740 1L779 26L798 14H852"
                  stroke="black"
                />
              </svg>
            </div>

            {/* <FactIcons progress={progress} /> */}
          </div>
        </div>
        <div className={s.backgroundImg}></div>
      </main>
    </>
  );
};
export default OnWay;
