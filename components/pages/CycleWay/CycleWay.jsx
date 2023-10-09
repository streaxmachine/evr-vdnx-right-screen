import React from "react";

import Guide from "components/common/GuideMain/Guide";
import GuideSecond from "components/common/GuideCards/Guide";
import ProgressBar from "components/common/ProgressBar";
import OnWay from "components/common/OnWay";

import s from "./CycleWay.module.scss";

const CycleWay = () => {
  const [state, setState] = React.useState(1);
  return (
    <>
      {state === 1 && <Guide setState={setState} />}
      {state === 2 && <GuideSecond setState={setState} />}
      {state === 3 && <ProgressBar setState={setState} />}
      {state === 4 && <OnWay setState={setState} />}
    </>
  );
};

export default CycleWay;
