import React from "react";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import { Html, Preload, useProgress } from "@react-three/drei";
import Link from "next/link";
import gsap from "gsap";
import Lottie from "lottie-react";

import TrainContainer from "./TrainContainer/TrainContainer";
import Timer from "components/common/Timer";
import CanvasPreloader from "components/common/CanvasPreloader";
import FakeAi from "components/common/FakeAi";

import useStore from "hooks/useStore";

import handAnimation from "./handAnimation.json";

import { details } from "./details";

import s from "./Home.module.scss";
import useScenarioTimer from "hooks/useScenarioTimer";

const Home = () => {
  // useScenarioTimer("ivolga", "time5", 5);
  const [count, setCount] = React.useState(1);
  const [touchedDetail, setTouchedDetail] = React.useState(0);
  const [isDone, setIsDone] = React.useState(false);
  const [isOutTime, setIsOutTime] = React.useState(false);
  const [disableTimer, setDisableTimer] = React.useState(false);
  const [currentState, setCurrentState] = React.useState("making-train");
  const [isFirstTime, setFirstTime] = React.useState(true);
  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);
  const { setScenario } = useStore();

  useScenarioTimer("ivolga", "time30", 30, disableTimer);

  React.useEffect(() => {
    setScenario({ type: "ivolga", place: "start" });
  }, []);

  React.useEffect(() => {
    if (count > 3) {
      setScenario({ type: "ivolga", place: "successLastDetail" });
      setDisableTimer(true);
      setIsDone(true);
      const timeout = setTimeout(() => {
        setScenario({ type: "ivolga", place: "successEnd" });
        setCurrentState("made-train");
      }, 4500);

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
      <CanvasPreloader />
      <div className={s.canvasTrain}>
        <div className={s.count}>{count}</div>
        {!isDone && (
          <Link href={"/quizNew"}>
            <div className={s.buttonBack}>
              <img src="/images/arrow.png" alt="Назад" />
              <p className={s.backText}>Главное меню</p>
            </div>
          </Link>
        )}

        {/* <LottieContainer /> */}

        {currentState === "made-train" && (
          <section
            className={`${s.fade_in} ${
              currentState === "made-train" ? s.fade_in_show : ""
            }`}
          >
            <img
              src="images/train/360.png"
              alt="360deg"
              className={s.buttonBackDone_img}
            ></img>
            <Link href={"/quizNew"}>
              <div className={s.buttonBackDone}>
                <p>Главное меню</p>
              </div>
            </Link>
          </section>
        )}

        {isFirstTime && <StarterMessage />}
        {currentState !== "made-train" && (
          <DetailsVisualization
            currentNumber={count}
            isDone={isDone}
            isOutTime={isOutTime}
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
          gl={{ preserveDrawingBuffer: true, antialias: false }}
        >
          <TrainContainer
            isDone={isDone}
            count={count}
            setCount={setCount}
            touchedDetail={touchedDetail}
            setTouchedDetail={setTouchedDetail}
          />
          <mesh>
            <Html className={s.test} scale={100}>
              <div>
                {""}
                <Lottie animationData={handAnimation} />
              </div>
            </Html>
            <boxGeometry />
          </mesh>
        </Canvas>
        <Timer
          time={time}
          setTime={setTime}
          setQuizDone={setIsDone}
          isQuizDone={isDone}
          isOutTime={isOutTime}
          setIsOutTime={setIsOutTime}
        />
        {currentState === "made-train" && <SuccessMessage />}
        {isOutTime && (
          <FailMessage
            time={time}
            setScenario={setScenario}
            setDisableTimer={setDisableTimer}
          />
        )}
        <FakeAi />
      </div>
    </>
  );
};

export default React.memo(Home);

const StarterMessage = () => {
  return (
    <div className={s.starterMessageRoot}>
      <p>Выберите правильную деталь. Подсказки на макете "Иволги".</p>
      <p>Переместите деталь на рельсы.</p>
      <p>Успейте собрать "Иволгу" за 3 минуты.</p>

      <div className={s.lineWithcircles}>
        <div className={`${s.circle} ${s.top}`}></div>
        <div className={`${s.circle} ${s.middle}`}></div>
        <div className={`${s.circle} ${s.bottom}`}></div>
      </div>
    </div>
  );
};

const detailsCounter = [
  { name: 1, id: 1 },
  { name: 2, id: 2 },
  { name: 3, id: 3 },
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
    <div className={s.detailsRoot}>
      {currentState !== "made-train" && (
        <>
          {detailsCounter.map((item) => {
            return (
              <div
                className={clsx(s.imgsWrapper, {
                  [s.current]: item.id === currentNumber,
                  [s.done]: isDone,
                  [s.timeFail]: isOutTime,
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
        <p className={s.successLeftWrapper_topText}>Поздравляем!</p>
        <p className={s.successLeftWrapper_middletext}>Вы собрали «Иволгу»! </p>
        <p className={s.successLeftWrapper_bottomText}>
          Покрутите модель чтобы рассмотреть детальнее.
        </p>
      </div>
      <div className={s.successRightWrapper}>
        <p className={s.successRightWrapper_title}>«Иволга»</p>
        <p className={s.successRightWrapper_text}>
          Тверской вагоностроительный завод стал флагманом городских
          электропоездов. Всего по состоянию на середину 2020 года произведён 41
          состав в трёх версиях. Три поколения Иволги заслужили любовь и
          уважение пассажиров. Опыт и отзывы пассажиров помогают продолжать
          совершенствовать поезд и создавать инновации в новых поколениях
          Иволги.
        </p>
        <img
          className={s.successRightWrapper_zig}
          alt="zig"
          src={"/images/train/line.png"}
        />
      </div>
    </div>
  );
};

const FailMessage = ({ setScenario, setDisableTimer }) => {
  const [isShow, setShow] = React.useState(false);

  React.useEffect(() => {
    setScenario({ type: "ivolga", place: "timeEnd" });
    setDisableTimer(true);

    const timeout = setTimeout(() => {
      setShow(true);
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {isShow && (
        <div className={s.failMessageRoot}>
          <div className={s.failMessageWrapper}>
            <img
              src="/images/train/Icon.png"
              alt="время вышло"
              className={s.failMessageWrapper_img}
            />
            <p className={s.failMessageWrapper_title}>Игра завершена!</p>
            <p className={s.failMessageWrapper_text}>
              Вы не успели собрать Иволгу, но не расстраивайтесь, вы попробовали
              и это уже отличный результат! Сыграйте еще раз или выберите другую
              игру. Уверен в следующий раз, результат будет еще лучше!
            </p>

            <div className={s.failMessageWrapper_button}>
              <p>Начать заново</p>
            </div>

            <Link href={"/quizNew"}>
              <div
                className={`${s.failMessageWrapper_button} ${s.button_blue}`}
              >
                <p>Главное меню</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

const LottieContainer = () => {
  return (
    <div className={s.lottieAnimation}>
      <Lottie animationData={handAnimation} />
    </div>
  );
};
