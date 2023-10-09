import React from "react";

import Guide from "components/common/GuideMain/Guide";
import GuideSecond from "components/common/GuideCards/Guide";
import ProgressBar from "components/common/ProgressBar";
import OnWay from "components/common/OnWay";

import { useSocket } from "components/common/SocketManager/SocketManager";

import s from "./CycleWay.module.scss";

const CycleWay = () => {
  const [state, setState] = React.useState(1);
  const socket = useSocket();
  return (
    <>
      {state === 1 && <Guide setState={setState} socket={socket} />}
      {state === 2 && <GuideSecond setState={setState} socket={socket} />}
      {state === 3 && <ProgressBar setState={setState} socket={socket} />}
      {state === 4 && <OnWay setState={setState} socket={socket} />}
    </>
  );
};

export default CycleWay;
