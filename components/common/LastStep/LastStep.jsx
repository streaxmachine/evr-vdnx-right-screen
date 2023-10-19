import React, { useState, useEffect } from "react";
import { useControls } from "leva";

import s from "./LastStep.module.scss";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

let cursor = {};

const OnWay = ({ setState, socket, setisBack }) => {
  // const { progress, calories, speed } = useControls({
  //   progress: {
  //     value: 1,
  //     step: 1,
  //     min: 0,
  //     max: 320,
  //   },
  //   calories: {
  //     value: 3.5,
  //     step: 1,
  //     min: 0,
  //     max: 100,
  //   },
  //   speed: {
  //     value: 30,
  //     step: 1,
  //     min: 0,
  //     max: 60,
  //   },
  // });

  const generateRandomSpeed = () => {
    const min = 20;
    const max = 30;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [randomSpeed] = useState(generateRandomSpeed());

  const generateRandomcalories = () => {
    const min = 5000; 
    const max = 13000; 
    const randomNum = (Math.floor(Math.random() * (max - min + 1)) + min) / 100;
    return randomNum;
  };

  // Инициализация случайного числа при монтировании компонента
  const [randomCalories] = useState(generateRandomcalories());

  const [inactiveTime, setInactiveTime] = useState(0);
  const [size, setSize] = useState([1280, 800]);

  const resetInactiveTime = () => {
    setInactiveTime(0);
  };

  const handleResize = (e) => {
    setSize([window.innerHeight, window.innerWidth]);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  useEffect(() => {
    const touchStartHandler = () => {
      resetInactiveTime();
    };

    const touchMoveHandler = () => {
      resetInactiveTime();
    };

    const timer = setInterval(() => {
      setInactiveTime(inactiveTime + 1);
    }, 1000);

    window.addEventListener("touchstart", touchStartHandler);
    window.addEventListener("touchmove", touchMoveHandler);

    return () => {
      clearInterval(timer);
      window.removeEventListener("touchstart", touchStartHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
    };
  }, [inactiveTime]);

  useEffect(() => {
    if (inactiveTime >= 40) {
      console.log("nobody`s here");
      setisBack(true);
      setState('progressBar');
      socket.send(
        JSON.stringify({
          installation: "velo",
          type: "level",
          data: "splashscreen",
        })
      );
    }
  }, [inactiveTime]);

  const handleSendTouchToSocket = (e) => {
    cursor.x = (e.clientX / size[0]) * 2 - 1;
    cursor.y = -(e.clientY / size[1]) * 2 + 1;
    console.log(cursor.x);
    socket.send(
      JSON.stringify({
        installation: "velo",
        type: "rotation",
        data: {
          x: cursor.x,
          y: cursor.y,
        },
      })
    );
  };

  return (
    <>
      <div className={s.canvasWrapper}>
        <Canvas onPointerMove={(e) => handleSendTouchToSocket(e)}>
          <Environment background preset="city" />
          <OrbitControls />
        </Canvas>
      </div>

      <main className={s.root}>
        <div className={s.rootWrapper}>
          <section className={s.content}>
            <div className={s.leftText}>
              <span className={s.title}>Поздравляем!</span>
              <span className={s.text}>
                Вы прибыли к Тверскому <p> императорскому дворцу! </p>
              </span>
              <span className={s.notion}>
                Покрутите модель чтобы рассмотреть
                <p> детальней</p>
              </span>
            </div>

            <div className={s.data}>
              <span className={s.dataText}>Средние данные о вашей поездке</span>
              <div className={s.dataTable}>
                <div className={s.speed}>
                  <p className={s.dataTitle}>Скорость</p>
                  <p className={s.dataNumber}>{randomSpeed}</p>
                  <p className={s.dataMeasure}>км/ч</p>
                </div>
                <div className={s.dist}>
                  <p className={s.dataTitle}>Расстояние</p>
                  <p className={s.dataNumber}>{100}</p>
                  <p className={s.dataMeasure}>км</p>
                </div>
                <div className={s.ccal}>
                  <p className={s.dataTitle}>Калории</p>
                  <p className={s.dataNumber}>{randomCalories}</p>
                  <p className={s.dataMeasure}>ккал</p>
                </div>
              </div>
            </div>
          </section>

          <div className={s.imgContainer}>
            <img
              className={s.img}
              src="/images/lastpage/360deg.png"
              alt="Degrees"
            />
          </div>
          <div className={s.backgroundGradient}></div>

          <div className={s.bottom}>
            <button
              onClick={() => {
                setisBack(true);
                setState('progressBar');
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
        </div>
      </main>
    </>
  );
};
export default OnWay;
