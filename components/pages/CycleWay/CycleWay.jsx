import React from "react";

import Hero from "components/common/Hero/Hero";
import Cards from "components/common/Cards/Cards";
import ProgressBar from "components/common/ProgressBar";
import OnWay from "components/common/OnWay";
import LastStep from "components/common/LastStep";

import { useSocket } from "hooks/useSocket";

import s from "./CycleWay.module.scss";

const CycleWay = () => {
  const [state, setState] = React.useState("hero");
  const [speed, setSpeed] = React.useState(0);
  const [calories, setCalories] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [isBack, setisBack] = React.useState(false);
  const [location, setLocation] = React.useState("1");
  const socket = useSocket([setSpeed, setCalories, setDistance]);
  return (
    <>
      {state === "hero" && <Hero setState={setState} socket={socket} />}
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
