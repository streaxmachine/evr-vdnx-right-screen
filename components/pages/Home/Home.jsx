import React from "react";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { Preload, useProgress } from "@react-three/drei";
import Link from "next/link";
import gsap from "gsap";

import TrainContainer from "./TrainContainer/TrainContainer";
import Timer from "components/common/Timer";

import { details } from "./details";

import s from "./Home.module.scss";

const Home = () => {
  const [count, setCount] = React.useState(1);
  const [touchedDetail, setTouchedDetail] = React.useState(0);
  const [isDone, setIsDone] = React.useState(false);
  const [currentState, setCurrentState] = React.useState("making-train");
  const [isFirstTime, setFirstTime] = React.useState(true);
  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);

  React.useEffect(() => {
    if (count > 3) {
      setIsDone(true);
      const timeout = setTimeout(() => {
        setCurrentState("made-train");
      }, 4000);

      return () => {
        clearTimeout(timeout);
      };
    }

    if (count > 1) {
      setFirstTime(false);
    }
  }, [count]);
  return (
    <>
      <Preloader />
      <div className={s.canvasTrain}>
        <div className={s.count}>{count}</div>
        {!isDone && (
          <Link href={"/quizNew"}>
            <div className={s.buttonBack}>
              <p>Главное меню</p>
            </div>
          </Link>
        )}

        {currentState === "made-train" && (
          <Link href={"/quizNew"}>
            <div className={s.buttonBackDone}>
              <p>Главное меню</p>
            </div>
          </Link>
        )}

        {isFirstTime && <StarterMessage />}
        {currentState !== "made-train" && (
          <DetailsVisualization
            currentNumber={count}
            isDone={isDone}
            currentState={currentState}
          />
        )}
        {touchedDetail !== 0 && (
          <DetailInfo detailNumber={touchedDetail} count={count} />
        )}
        <Canvas
          shadows
          orthographic
          // frameloop="demand"
          camera={{
            position: [10, 20, 20],
            rotation: [Math.PI, 0, 0],
            zoom: 30,
          }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <TrainContainer
            isDone={isDone}
            count={count}
            setCount={setCount}
            touchedDetail={touchedDetail}
            setTouchedDetail={setTouchedDetail}
          />
        </Canvas>
        <Timer
          time={time}
          setTime={setTime}
          setQuizDone={setIsDone}
          isQuizDone={isDone}
        />
        {currentState === "made-train" && <SuccessMessage />}
        <FailMessage time={time} />
      </div>
    </>
  );
};

export default React.memo(Home);

const StarterMessage = () => {
  return (
    <div className={s.starterMessageRoot}>
      <p>Выберите правильную деталь. Подсказки на макете "Иволги".</p>
      <p>Выберите правильную деталь. Подсказки на макете "Иволги".</p>
      <p>Успейте собрать "Иволгу" за 3 минуты.</p>
    </div>
  );
};

const detailsCounter = [
  { name: 1, id: 1 },
  { name: 2, id: 2 },
  { name: 3, id: 3 },
];

const DetailsVisualization = ({ currentNumber, isDone }) => {
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
    <div className={s.detailsRoot}>
      {currentState !== "made-train" && (
        <>
          {detailsCounter.map((item) => {
            return (
              <div
                className={clsx(s.imgsWrapper, {
                  [s.current]: item.id === currentNumber,
                  [s.done]: isDone,
                })}
                key={item.id}
              >
                {item.name}
              </div>
            );
          })}
        </>
      )}
      {currentState === "made-train" && (
        <div className={s.finalImgWrapper}>
          <img className={s.finalImg} src="/images/train/finalTrain.png"></img>
        </div>
      )}
    </div>
  );
};

const DetailInfo = React.memo(({ detailNumber, count }) => {
  const rootRef = React.useRef();
  const detail = React.useMemo(() => {
    return details.filter((item) => item.id === detailNumber);
  }, [detailNumber]);
  React.useEffect(() => {
    gsap.to(rootRef.current, {
      right: "64rem",
      duration: 1,
      ease: "elastic.out(0.2,0.5)",
    });

    const timeout = setTimeout(() => {
      gsap.to(rootRef.current, {
        right: "-100%",
        duration: 0.5,
        ease: "expo.in",
      });
    }, 3500);

    return () => {
      clearTimeout(timeout);
      gsap.set(rootRef.current, {
        right: "-100%",
        ease: "expo.in",
      });
    };
  }, [detailNumber]);

  return (
    <div
      ref={rootRef}
      className={clsx(s.detailInfoRoot, {
        [s.correct]: Number(detailNumber) === Number(count - 1),
      })}
    >
      <div className={s.detailsName}>{detail[0].name}</div>
      <div className={s.detailstext}>{detail[0].description}</div>
      <img
        className={s.detailsImg}
        src={detail[0].picSrc}
        alt={detail[0].alt}
      />
      <img
        className={s.detailZig}
        alt="zig"
        src={
          Number(detailNumber) === Number(count - 1)
            ? "/images/train/line.png"
            : "/images/train/line_red.png"
        }
      />
    </div>
  );
});

const SuccessMessage = () => {
  return (
    <div className={s.successMessageRoot}>
      <div className={s.successLeftWrapper}>
        <p>Поздравляем!</p>
        <p>Вы собрали «Иволгу»! </p>
        <p>Покрутите модель чтобы рассмотреть детальнее.</p>
      </div>
      <div className={s.successRightWrapper}>
        <p>Иволга</p>
        <div>
          Тверской вагоностроительный завод стал флагманом городских
          электропоездов. Всего по состоянию на середину 2020 года произведён 41
          состав в трёх версиях. Три поколения Иволги заслужили любовь и
          уважение пассажиров. Опыт и отзывы пассажиров помогают продолжать
          совершенствовать поезд и создавать инновации в новых поколениях
          Иволги.
        </div>
      </div>
    </div>
  );
};

const FailMessage = ({ time = "000:000" }) => {
  if (time === "000:000") {
    return (
      <div className={s.failMessageRoot}>
        <div className={s.failMessageWrapper}>
          <p>Игра завершена время вышло</p>
          <Link href={"/quizNew"}>
            <div>
              <button>Главное меню</button>
            </div>
          </Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const Preloader = () => {
  const { progress } = useProgress();
  const [isPreloader, setPreloader] = React.useState(true);

  React.useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setPreloader(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [progress]);

  return (
    <>{isPreloader && <div className={s.preloader}>Загружаемся ...</div>}</>
  );
};
