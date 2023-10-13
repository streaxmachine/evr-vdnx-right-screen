import React, { useState } from "react";
import { useControls } from "leva";

import FactIcons from "./FactIcons";

import s from "./OnWay.module.scss";

const OnWay = ({
  setState,
  socket,
  speedSocket,
  caloriesSocket,
  distanceSocket,
  setisBack,
}) => {
  const [filledCells, setFilledCells] = useState(0);

  const { progress, calories, speed } = useControls({
    progress: {
      value: 1,
      step: 1,
      min: 0,
      max: 320,
    },
    calories: {
      value: 3.5,
      step: 1,
      min: 0,
      max: 100,
    },
    speed: {
      value: 30,
      step: 1,
      min: 0,
      max: 60,
    },
  });

  const isSlow = speed < 20;
  const isOkay = speed > 20 && speed < 40;
  const isFast = speed > 40;

  React.useEffect(() => {
    const newFilledCells = Math.floor((speed / 48) * 28); // 48 - максимальное значение speed, 28 - количество ячеек
    setFilledCells(newFilledCells);
  }, [speed]);

  React.useEffect(() => {
    if (progress === 320) {
      // setState(5);
      null
    }
  }, [progress]);

  const rays = Array.from({ length: 28 }, (_, index) => {
    const isFilled = index < filledCells;
    const isRed = (speed < 20 && isFilled) || (speed > 40 && !isFilled);

    return (
      <div
        className={`${s.ray} ${isFilled ? s.filled : ""} ${isRed ? s.red : ""}`}
        style={{
          transform: `rotate(${
            (220 / 27) * index - 110
          }deg) translateY(-200px)`,
        }}
        key={index}
      ></div>
    );
  });

  const progressPercent = (progress / 320) * 100;
  const calculateManualYPosition = (progressPercent) => {
    const intervals = [
      { start: 0, end: 9, value: "0rem" },
      { start: 9, end: 12, value: "14rem" },
      { start: 12, end: 14, value: "-18rem" },
      { start: 14, end: 16, value: "0rem" },
      { start: 16, end: 18, value: "14rem" },
      { start: 18, end: 20, value: "0rem" },
      { start: 20, end: 22, value: "-18rem" },
      { start: 22, end: 24, value: "0rem" },
      { start: 24, end: 26, value: "14rem" },
      { start: 26, end: 28, value: "0rem" },
      { start: 28, end: 30, value: "-18rem" },
      { start: 30, end: 32, value: "0rem" },
      { start: 32, end: 34, value: "14rem" },
      { start: 34, end: 36, value: "0rem" },
      { start: 36, end: 38, value: "-18rem" },
      { start: 38, end: 40, value: "0rem" },
      { start: 40, end: 42, value: "14rem" },
      { start: 42, end: 44, value: "0rem" },
      { start: 44, end: 48, value: "-18rem" },
      { start: 42, end: 44, value: "0rem" },
      { start: 48, end: 50, value: "14rem" },
      { start: 50, end: 52, value: "0rem" },
      { start: 52, end: 54, value: "-18rem" },
      { start: 54, end: 56, value: "0rem" },
      { start: 56, end: 58, value: "14rem" },
      { start: 58, end: 60, value: "0rem" },
      { start: 60, end: 62, value: "-18rem" },
      { start: 62, end: 64, value: "0rem" },
      { start: 64, end: 66, value: "14rem" },
      { start: 66, end: 68, value: "0rem" },
      { start: 68, end: 70, value: "-18rem" },
      { start: 72, end: 74, value: "0rem" },
      { start: 72, end: 74, value: "14rem" },
      { start: 74, end: 76, value: "0rem" },
      { start: 76, end: 78, value: "-18rem" },
      { start: 78, end: 80, value: "0rem" },
      { start: 80, end: 82, value: "14rem" },
      { start: 82, end: 100, value: "0rem" },
    ];

    for (const interval of intervals) {
      if (progressPercent >= interval.start && progressPercent < interval.end) {
        return interval.value;
      }
    }
    return "0rem"; // По умолчанию
  };

  const progressBarStyle = {
    "--progress-width": `${(progress / 320) * 100}%`,
    "--y-position": calculateManualYPosition(progressPercent),
  };

  return (
    <>
      <main className={s.page}>
        <div
          className={s.navigationBack}
          onClick={() => {
            setisBack(true);
            setState(3);
            socket.send(
              JSON.stringify({
                installation: "velo",
                type: "level",
                data: "splashscreen",
              })
            );
          }}
        >
          <img src="/images/arrow.png" alt="Назад" />{" "}
          <span className={s.textBack}>Изменить маршрут</span>
        </div>

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

        {isFast && (
          <div className={s.notification}>
            <img
              src="/images/onway/warning.png"
              alt="Progress Bar"
              className={s.notificationImage}
            />
            <span className={s.notificationText}>Cбавь скорость</span>
          </div>
        )}

        {isOkay && (
          <div className={s.notification}>
            <img
              src="/images/onway/tick.png"
              alt="Progress Bar"
              className={s.notificationImage}
            />
            <span className={s.notificationText}>Идеальная скорость</span>
          </div>
        )}

        <section className={s.data}>
          <div className={s.ccal}>
            <p className={s.dataTitle}>Калории</p>
            <p className={s.dataNumber}>{caloriesSocket}</p>
            <p className={s.dataMeasure}>ккал</p>
          </div>
          <div className={s.speed}>
            <p className={s.dataTitle}>Расстояние</p>
            <p className={s.speedNumber}>{speedSocket}</p>
            <p className={s.dataMeasure}>км/ч</p>
          </div>
          <div className={s.dist}>
            <p className={s.dataTitle}>Расстояние</p>
            <p className={s.dataNumber}>{distanceSocket}</p>
            <p className={s.dataMeasure}>км</p>
          </div>
        </section>

        <div className={s.speedometer}>
          <div className={s.sunRays}>{rays}</div>
        </div>

        <div className={s.route}>
          <span className={s.textStart}>Начало маршрута</span>
          <span className={s.textEnd}>Тверской императорский дворец</span>
        </div>

        <div className={s.progressContainer}>
          <img
            src="/images/onway/on_way_progress.png"
            alt="Progress Bar"
            className={s.baseimage}
          />
          <div className={s.overlayimage} style={progressBarStyle}></div>

          <div className={s.iconContainer}>
            <img
              src="/images/onway/on_way_point.png"
              alt="Icon"
              className={s.icon}
              style={{
                left: progressBarStyle["--progress-width"],
                marginTop: progressBarStyle["--y-position"],
              }}
            />
          </div>

          <FactIcons progress={progress} />
        </div>
      </main>
    </>
  );
};
export default OnWay;
