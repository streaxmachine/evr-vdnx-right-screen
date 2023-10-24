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
  const [isQuizDone, setQuizDone] = React.useState(false);
  const [isFirstTime, setFirstTime] = React.useState(true);
  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);

  React.useEffect(() => {
    if (count > 1) {
      setFirstTime(false);
    }
  }, [count]);
  return (
    <>
      <Preloader />
      <div className={s.canvasTrain}>
        <div className={s.count}>{count}</div>
        <Link href={"/quizNew"}>
          <div className={s.buttonBack}>
            <p>Главное меню</p>
          </div>
        </Link>

        {isFirstTime && <StarterMessage />}
        <DetailsVisualization currentNumber={count} />
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
            count={count}
            setCount={setCount}
            touchedDetail={touchedDetail}
            setTouchedDetail={setTouchedDetail}
          />
        </Canvas>
        <Timer
          time={time}
          setTime={setTime}
          setQuizDone={setQuizDone}
          isQuizDone={isQuizDone}
        />
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
  { name: 4, id: 4 },
  { name: 5, id: 5 },
  { name: 6, id: 6 },
];

const DetailsVisualization = ({ currentNumber, count }) => {
  return (
    <div className={s.detailsRoot}>
      {detailsCounter.map((item) => {
        return (
          <div
            className={clsx({
              [s.current]: item.id === currentNumber,
            })}
            key={item.id}
          >
            {item.name}
          </div>
        );
      })}
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
