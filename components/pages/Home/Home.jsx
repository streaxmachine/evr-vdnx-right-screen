import React from "react";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";

import TrainContainer from "./TrainContainer/TrainContainer";
import Timer from "components/common/Timer";

import s from "./Home.module.scss";

const Home = () => {
  const [count, setCount] = React.useState(1);
  const [touchedDetail, setTouchedDetail] = React.useState(0);
  const [isQuizDone, setQuizDone] = React.useState(false);
  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);
  return (
    <div className={s.canvasTrain}>
      <div className={s.count}>{count}</div>
      <div className={s.buttonBack}>
        <p>Главное меню</p>
      </div>
      <DetailsVisualization currentNumber={count} />
      {touchedDetail !== 0 && <DetailInfo detailNumber={touchedDetail} />}
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

const DetailsVisualization = ({ currentNumber }) => {
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

const detailsInfo = [
  { name: 1, description: "im 1 ", id: 1 },
  { name: 2, description: "im 2", id: 2 },
  { name: 3, description: "im 3", id: 3 },
  { name: 4, description: "im 4", id: 4 },
  { name: 5, description: "im 5", id: 5 },
  { name: 6, description: "im 6", id: 6 },
];

const DetailInfo = React.memo(({ detailNumber }) => {
  const rootRef = React.useRef();

  const detail = React.useMemo(() => {
    return detailsInfo.filter((item) => item.id === detailNumber);
  }, [detailNumber]);
  React.useEffect(() => {
    gsap.to(rootRef.current, {
      right: "64rem",
      duration: 1,
      ease: "elastic.out(0.3,0.3)",
    });

    const timeout = setTimeout(() => {
      gsap.to(rootRef.current, {
        right: "-100%",
        duration: 0.5,
      });
    }, 3500);

    return () => {
      clearTimeout(timeout);
      gsap.set(rootRef.current, {
        right: "-100%",
      });
    };
  }, [detailNumber]);

  return (
    <div ref={rootRef} className={s.detailInfoRoot}>
      <div>{detail[0].name}</div>
      <div>{detail[0].description}</div>
    </div>
  );
});
