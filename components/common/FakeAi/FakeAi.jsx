import React from "react";

import useStore from "hooks/useStore";

import { scenaries } from "./scenaries";

import s from "./FakeAi.module.scss";

function getRandomElement(arr) {
  if (arr.length) {
    var item = arr[Math.floor(Math.random() * arr.length)];
    return item;
  }
}

const FakeAi = () => {
  const textRef = React.useRef();
  const [text, setText] = React.useState("");
  const { scenario } = useStore();

  React.useEffect(() => {
    // console.log(scenaries[scenario.type][scenario.place]);
    if (scenario.type) {
      const phrase = getRandomElement(scenaries[scenario.type][scenario.place]);
      setText(phrase);
    }
  }, [scenario]);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.speechBubble} ref={textRef}>
          {text}
        </div>
        {/* <div className={s.aiChat}></div> */}
      </div>
    </div>
  );
};

export default React.memo(FakeAi);
