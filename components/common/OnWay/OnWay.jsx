import React, { useState } from "react";

import { locations } from "./locations";

import s from "./OnWay.module.scss";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `0${minutes}0:0${seconds}`;
};

const OnWay = ({
  setState,
  socket,
  speedSocket = 0,
  location,
  distanceSocket = 0,
  setDistance,
  setTimeValue,
  setSpeed,
  setisBack,
}) => {
  const [filledCells, setFilledCells] = useState(0);
  const rootRef = React.useRef();
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);

  const item = locations.filter((item, id) => {
    return item.id === location;
  });
  // console.log(item);
  React.useEffect(() => {
    setSpeed(0);
    setDistance(0);
  }, []);

  const realTime = React.useMemo(() => {
    return formatTime(time);
  }, [time]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  React.useEffect(() => {
    setProgress(distanceSocket);

    if (Math.round(Number(progress)) === 100) {
      setTimeValue(realTime);
      const timeout = setTimeout(() => {
        setState("lastStep");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [progress, distanceSocket]);

  const isSlow = speedSocket <= 1.9;
  const isOkay = speedSocket > 1.9 && speedSocket <= 3.9;
  const isFast = speedSocket > 3.9;


  React.useEffect(() => {
    const newFilledCells = Math.floor((speedSocket / 5.1) * 28); // 48 - максимальное значение speedSocket, 28 - количество ячеек
    setFilledCells(newFilledCells);
  }, [speedSocket]);

  React.useEffect(() => {
    rootRef.current.style.setProperty("--progress", progress + "%");
  }, [progress]);

  const rays = Array.from({ length: 28 }, (_, index) => {
    const isFilled = index < filledCells;
    const isRed =
      (speedSocket <= 1 && isFilled) || (speedSocket > 3 && !isFilled);

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

  const roundedNumber = (number) => {
    return Math.round(number * 10) / 10;
  };

  return (
    <>
      <main ref={rootRef} className={s.root}>
        <div className={s.backgroundImg}>
          <img src={item[0].url} alt="" />
        </div>
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
            <div className={s.dataWrapper}>
              <div className={s.ccal}>
                <p className={s.dataTitle}>Время</p>
                <p style={{ width: "160rem" }} className={s.dataNumber}>
                  {realTime}
                </p>
                <p className={s.dataMeasure}>мин</p>
              </div>
              <div className={s.speed}>
                <p className={s.dataTitle}>Скорость</p>
                <p className={s.speedNumber}>{roundedNumber(speedSocket * 2.8) }</p>
                <p className={s.dataMeasure}>км/ч</p>
              </div>
              <div className={s.dist}>
                <p className={s.dataTitle}>Расстояние</p>
                <p className={s.dataNumber}>
                  {roundedNumber((item[0].dist / 100) * Number(distanceSocket))}
                </p>
                <p className={s.dataMeasure}>м</p>
              </div>
            </div>
          </div>
          <div className={s.speedometer}>
            <div className={s.sunRays}>{rays}</div>
          </div>
          <div className={s.route}>
            <span className={s.textStart}>Начало маршрута</span>
            <span className={s.textEnd}>{item[0].end}</span>
          </div>
          <div className={s.progressRoot}>
            <div className={s.progressWrapper}>
              <div className={s.baseImage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="852"
                  height="47"
                  viewBox="0 0 852 47"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M159.587 24.9276L119.931 0L82.2703 24.8982L62.4892 12.4638H42.7081L23.5978 12.4494H4.48741L0.067694 12.435L0 34.5073L4.48741 34.5218H23.6874H42.7081L62.7152 34.5073L82.543 46.9711L120.204 22.0729L159.766 46.9418L198.032 22.0722L236.947 46.9414L276.285 22.0133L314.731 47L353.131 22.0435L392.787 46.9711L430.448 22.0729L470.01 46.9418L508.276 22.0722L547.19 46.9414L585.883 22.2138L624.021 47L662.421 22.0435L702.076 46.9711L739.738 22.0729L779.3 46.9418L798 35H852V13H798L779.121 24.9276L739.465 0L701.804 24.8982L662.242 0.029378L624.021 24.8694L585.847 0.0596561L546.4 24.4225L508.185 0.000672113L469.831 24.9276L430.175 0L392.514 24.8982L352.952 0.029378L314.731 24.8694L276.557 0.0596561L236.625 24.7222L197.941 0.000672113L159.587 24.9276Z"
                    fill="white"
                    fillOpacity="1.0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M159.587 24.9276L119.931 0L82.2703 24.8982L62.4892 12.4638H42.7081L23.5978 12.4494H4.48741L0.067694 12.435L0 34.5073L4.48741 34.5218H23.6874H42.7081L62.7152 34.5073L82.543 46.9711L120.204 22.0729L159.766 46.9418L198.032 22.0722L236.947 46.9414L276.285 22.0133L314.731 47L353.131 22.0435L392.787 46.9711L430.448 22.0729L470.01 46.9418L508.276 22.0722L547.19 46.9414L585.883 22.2138L624.021 47L662.421 22.0435L702.076 46.9711L739.738 22.0729L779.3 46.9418L798 35H852V13H798L779.121 24.9276L739.465 0L701.804 24.8982L662.242 0.029378L624.021 24.8694L585.847 0.0596561L546.4 24.4225L508.185 0.000672113L469.831 24.9276L430.175 0L392.514 24.8982L352.952 0.029378L314.731 24.8694L276.557 0.0596561L236.625 24.7222L197.941 0.000672113L159.587 24.9276Z"
                    fill="url(#paint0_linear_299_9740)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_299_9740"
                      x1="-64.1727"
                      y1="47"
                      x2="-33.8638"
                      y2="47"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="0.989483" stopColor="white" />
                      <stop
                        offset="0.989583"
                        stopColor="white"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

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
          </div>
        </div>
      </main>
    </>
  );
};
export default React.memo(OnWay);

const OnWayPointsWrapper = ({ points, distanceSocket }) => {
  return (
    <>
      {points.map((item, id) => {
        return <Point key={id} point={item} distanceSocket={distanceSocket} />;
      })}
    </>
  );
};

const Point = ({ point, distanceSocket }) => {
  const [showInfo, setShowInfo] = React.useState(false);

  React.useEffect(() => {
    if (Number(point.percent) <= distanceSocket) {
      // if (distanceSocket <= Number(point.percent) + 1) {
      setShowInfo(true);
      // }
    } else {
      setShowInfo(false);
    }
  }, [point, distanceSocket]);

  return (
    <div>
      <div
        className={s.point}
        style={{ left: point.percent + "%" }}
        key={point.percent}
      >
        {showInfo && (
          <div className={s.textWrapper}>
            <img src={point.url} alt="" />
          </div>
        )}
        <div className={s.circle}></div>
        <div className={s.stick}></div>
      </div>
    </div>
  );
};
