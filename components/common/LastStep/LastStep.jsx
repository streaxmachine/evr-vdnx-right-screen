import React, { useState } from "react";
import { useControls } from "leva";

import s from "./LastStep.module.scss";

const OnWay = ({ setState, socket} ) => {
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
  
  return (
    <>
      <main className={s.page}>
        <section className={s.content}>
          <span className={s.textBack}>Поздравляем!</span>
          <span className={s.text}>
            Вы прибыли <p>к Путевому дворцу </p>
          </span>
          <span className={s.notion}>
            Покрутите модель чтобы
            <p>рассмотреть детальней</p>
          </span>
        </section>

        <div className={s.data}>
          <span className={s.dataText}>Средние данные о вашей поездке</span>
          <div className={s.speed}>
            <p className={s.dataTitle}>Скорость</p>
            <p className={s.dataNumber}>{speed}</p>
            <p className={s.dataMeasure}>км/ч</p>
          </div>
          <div className={s.dist}>
            <p className={s.dataTitle}>Расстояние</p>
            <p className={s.dataNumber}>{progress}</p>
            <p className={s.dataMeasure}>км</p>
          </div>
          <div className={s.ccal}>
            <p className={s.dataTitle}>Калории</p>
            <p className={s.dataNumber}>{calories}</p>
            <p className={s.dataMeasure}>ккал</p>
          </div>
        </div>

        <div className={s.imgContainer}>
          <img className={s.img} src="/images/360deg.png" alt="Degrees" />
        </div>

        <div className={s.bottom}>
          <button
            onClick={() => {
              setState(1);
              socket.send(
                JSON.stringify({
                  installation: "velo",
                  type: "level",
                  data: "splashscreen",
                })
              );
            }}
            className={s.button}
          >
            Завершить поездку
          </button>
        </div>
      </main>
    </>
  );
};
export default OnWay;
