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
  setisBack
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
      setState(5);
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

  const progressBarStyle = {
    "--progress-width": `${(progress / 320) * 100}%`, //progress MAx нужно ввести
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
              src="/images/warning.png"
              alt="Progress Bar"
              className={s.notificationImage}
            />
            <span className={s.notificationText}>Ускорься</span>
          </div>
        )}

        {isFast && (
          <div className={s.notification}>
            <img
              src="/images/warning.png"
              alt="Progress Bar"
              className={s.notificationImage}
            />
            <span className={s.notificationText}>Cбавь скорость</span>
          </div>
        )}

        {isOkay && (
          <div className={s.notification}>
            <img
              src="/images/tick.png"
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
            src="/images/on_way_progress.png"
            alt="Progress Bar"
            className={s.baseimage}
          />
          <div className={s.overlayimage} style={progressBarStyle}></div>
          <div className={s.iconContainer}>
            <img
              src="/images/on_way_point.png"
              alt="Icon"
              className={s.icon}
              style={{ left: progressBarStyle["--progress-width"] }}
            />
          </div>

          <FactIcons progress={progress} />
        </div>
      </main>
    </>
  );
};
export default OnWay;
