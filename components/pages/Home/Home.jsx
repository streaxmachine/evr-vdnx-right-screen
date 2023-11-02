import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Lottie from "lottie-react";

import Timer from "components/common/Timer";
import CanvasPreloader from "components/common/CanvasPreloader";
import FakeAi from "components/common/FakeAi";
import DetailHelpers from "./DetailHelper";
import Canvas3d from "./Canvas3d";
import DetailVisualization from "./DetailVisualization";
import DetailInfo from "./DetailInfo";
import FailMessage from "./FailMessage";

import useStore from "hooks/useStore";
import useScenarioTimer from "hooks/useScenarioTimer";

import s from "./Home.module.scss";

const Home = () => {
  // useScenarioTimer("ivolga", "time5", 5);
  const router = useRouter();
  const [count, setCount] = React.useState(1);
  const [touchedDetail, setTouchedDetail] = React.useState(0);
  const [isDone, setIsDone] = React.useState(false);
  const [isOutTime, setIsOutTime] = React.useState(false);
  const [disableTimer, setDisableTimer] = React.useState(true);
  const [currentState, setCurrentState] = React.useState("making-train");
  const [isFirstTime, setFirstTime] = React.useState(true);
  const [time, setTime] = React.useState("0" + 3 + "0:10" + 0);
  const { setScenario } = useStore();
  const [isTimeEndGame, setTimeEndGame] = React.useState(false);
  const [resetGame, setResetGame] = React.useState(false);
  const [disableTouch, setDisableTouch] = React.useState();
  const [isClickedRules, setClickedRules] = React.useState(false);
  const [isShowPopUp, setShowPopUp] = React.useState(true);

  const [pauseTimer, setPauseTimer] = React.useState(false);

  useScenarioTimer("ivolga", "time30", 30, disableTimer);

  React.useEffect(() => {
    setScenario({ type: "ivolga", place: "start" });
  }, []);

  React.useEffect(() => {
    if (count > 10) {
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
      {resetGame && <div className={s.preloader}></div>}
      <CanvasPreloader />

      <div className={s.canvasTrain}>
        {!isDone && !isTimeEndGame && (
          <Link href={"/quizNew"}>
            <div className={s.buttonBack}>
              <img src="/images/arrow.png" alt="Назад" />
              <p className={s.backText}>Главное меню</p>
            </div>
          </Link>
        )}

        {currentState === "made-train" && !isTimeEndGame && (
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

        {isFirstTime && !isTimeEndGame && (
          <StarterMessage
            isClicked={isClickedRules}
            setClicked={setClickedRules}
          />
        )}
        {currentState !== "made-train" && !isTimeEndGame && (
          <div className={s.detailsRoot}>
            {!isOutTime && !isDone && (
              <Image
                priority
                className={s.base}
                src="/images/ivolgaDetails/base_alpha.png"
                width={330}
                height={152}
                alt=""
              />
            )}
            <DetailVisualization
              currentNumber={count}
              isDone={isDone}
              isOutTime={isOutTime}
              currentState={currentState}
            />
          </div>
        )}

        <div
          style={{
            zIndex: 2,
            background:
              count === touchedDetail + 1 ? "rgb(161 245 161)" : "#f98787",
            pointerEvents: isShowPopUp ? "all" : "none",
            opacity: isShowPopUp ? "0.35" : "0",
          }}
          className={s.popUpsWrapper}
        />

        <DetailInfo
          setShowPopUp={setShowPopUp}
          isShowPopUp={isShowPopUp}
          detailNumber={touchedDetail}
          setPauseTimer={setPauseTimer}
          setDisableTouch={setDisableTouch}
          count={count}
        />

        <Canvas3d
          isDone={isDone}
          setCount={setCount}
          count={count}
          touchedDetail={touchedDetail}
          setTouchedDetail={setTouchedDetail}
        />

        {!isTimeEndGame && isClickedRules && (
          <Timer
            time={time}
            pauseTimer={pauseTimer}
            setTime={setTime}
            setQuizDone={setIsDone}
            isQuizDone={isDone}
            isOutTime={isOutTime}
            setIsOutTime={setIsOutTime}
            setTimeEndGame={setTimeEndGame}
          />
        )}

        {currentState === "made-train" && <SuccessMessage />}

        {isOutTime && (
          <FailMessage
            setResetGame={setResetGame}
            router={router}
            time={time}
            setTimeEndGame={setTimeEndGame}
            setScenario={setScenario}
            setDisableTimer={setDisableTimer}
          />
        )}

        {/* <FakeAi /> */}
        {/* <div className={s.aiChat}></div> */}
      </div>
    </>
  );
};

export default React.memo(Home);

const StarterMessage = ({ isClicked, setClicked }) => {
  return (
    <>
      {!isClicked && (
        <>
          <div className={s.starterBackground}></div>
          <div className={s.starterMessageRoot}>
            <div className={s.starterWrapper}>
              <h2 className={s.starterHeadline}>Как играть?</h2>
              <div className={s.starterContent}>
                <div className={s.lineWithcircles}>
                  <div className={`${s.circle} ${s.top}`}></div>
                  <div className={`${s.circle} ${s.middle}`}></div>
                  <div className={`${s.circle} ${s.bottom}`}></div>
                </div>
                <div className={s.textContainer}>
                  <p style={{ marginTop: "0rem" }}>
                    Выберите правильную деталь. Подсказки на макете "Иволги".
                  </p>
                  <p style={{ marginTop: "0rem" }}>
                    Переместите деталь на рельсы.
                  </p>
                  <p style={{ marginTop: "0rem" }}>
                    Успейте собрать "Иволгу" за 3 минуты.
                  </p>
                </div>
              </div>
              <button className={s.starterBtn} onClick={() => setClicked(true)}>
                Понятно
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

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
          электропоездов. <p> Всего по состоянию на осень 2023 года произведёно 55
          составов в трёх версиях.</p> Три поколения Иволги заслужили любовь и
          уважение пассажиров. Опыт и отзывы пассажиров помогают продолжать
          совершенствовать поезд и создавать инновации в новых поколениях
          «Иволги».
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
