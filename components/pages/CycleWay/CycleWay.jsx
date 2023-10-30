import React from "react";

import Hero from "components/common/Hero/Hero";
import Cards from "components/common/Cards/Cards";
import ProgressBar from "components/common/ProgressBar";
import OnWay from "components/common/OnWay";
import LastStep from "components/common/LastStep";
import useScenarioTimer from "hooks/useScenarioTimer";

import { useSocket } from "hooks/useSocket";

import s from "./CycleWay.module.scss";

const CycleWay = () => {
  useScenarioTimer("ivolga", "time5", 5);
  useScenarioTimer("ivolga", "time30", 30);

  const [state, setState] = React.useState("hero");
  const [speed, setSpeed] = React.useState(0);
  const [calories, setCalories] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [isBack, setisBack] = React.useState(false);
  const [location, setLocation] = React.useState("1");
  const [isOutTime, setOutTime] = React.useState("hero");
  const [isConnected, setConnected] = React.useState(false);
  const [isFree, setFree] = React.useState(true);
  const socket = useSocket([
    setSpeed,
    setCalories,
    setDistance,
    setOutTime,
    setConnected,
    setFree,
  ]);

  React.useEffect(() => {
    if (state !== "hero") {
      setOutTime(false);
    }
  }, [state]);

  React.useEffect(() => {
    if (isOutTime === true) {
      setState("hero");
    }
  }, [isOutTime]);

  const handleMakeBusy = React.useCallback(() => {
    if (isConnected) {
      socket.send(
        JSON.stringify({
          installation: "velo",
          type: "isFree",
          data: 0,
        })
      );
    }
  }, [isConnected]);

  const handleMakeFree = React.useCallback(() => {
    if (isConnected) {
      socket.send(
        JSON.stringify({
          installation: "velo",
          type: "isFree",
          data: 1,
        })
      );
    }
  }, [isConnected]);

  // console.log(isFree);

  return (
    <>
      {!isFree && <div className={s.busy}>Экран пока не доступен</div>}
      {state === "hero" && (
        <Hero
          setState={setState}
          setFree={setFree}
          handleMakeBusy={handleMakeBusy}
          handleMakeFree={handleMakeFree}
          socket={socket}
        />
      )}
      {state === "cards" && (
        <Cards
          setState={setState}
          socket={socket}
          setisBack={setisBack}
          setLocation={setLocation}
        />
      )}
      {state === "progressBar" && (
        <ProgressBar setState={setState} socket={socket} isBack={isBack} />
      )}
      {state === "onway" && (
        <OnWay
          setState={setState}
          setDistance={setDistance}
          setSpeed={setSpeed}
          socket={socket}
          speedSocket={speed}
          distanceSocket={distance}
          caloriesSocket={calories}
          location={location}
          setisBack={setisBack}
        />
      )}
      {state === "lastStep" && (
        <LastStep
          location={location}
          setState={setState}
          speedSocket={speed}
          setFree={setFree}
          distanceSocket={distance}
          caloriesSocket={calories}
          socket={socket}
          setisBack={setisBack}
        />
      )}
    </>
  );
};

export default CycleWay;
