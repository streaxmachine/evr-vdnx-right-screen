import React from "react";

import useStore from "hooks/useStore";

import { scenaries } from "./scenaries";

import s from "./FakeAi.module.scss";

function getRandomElement(arr) {
  if (arr?.length) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    var item = arr[randomNumber];
    return { item, randomNumber };
  }
}

const FakeAi = () => {
  const textRef = React.useRef();
  const [text, setText] = React.useState("");
  const { scenario, setMusicIndex } = useStore();
  const [isRerender, setRerender] = React.useState(false);

  React.useEffect(() => {
    if (scenario.type) {
      const phrases = scenaries[scenario.type][scenario.place];
      const phrase = getRandomElement(phrases);

      if (
        scenario.place === "succesFirstTry" ||
        scenario.place === "falseFirstTry" ||
        scenario.place === "falseSecondTry"
      ) {
        setRerender(!isRerender);
        setMusicIndex({
          soundIndex: phrase.randomNumber,
          rerender: isRerender,
        });
      }

      setText(phrase.item);
    }
  }, [scenario]);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.speechBubble} ref={textRef}>
          {text}
        </div>
        <div className={s.triangle}></div>
        {/* <div className={s.aiChat}></div> */}
      </div>
    </div>
  );
};

export default React.memo(FakeAi);
