import React from "react";

import useStore from "hooks/useStore";

import { scenaries } from "./scenaries";

import s from "./FakeAi.module.scss";

function getRandomElement(arr) {
  if (arr?.length) {
    var item = arr[Math.floor(Math.random() * arr.length)];
    return item;
  }
}

const FakeAi = () => {
  const textRef = React.useRef();
  const trueAnswer = React.useRef();
  const falseAnswer = React.useRef();
  const [text, setText] = React.useState("");
  // const [musicUrl, setMusicUrl] = React.useState("/music/RightAnswer.wav");
  const { scenario } = useStore();

  React.useEffect(() => {
    // console.log(scenaries[scenario.type][scenario.place]);
    if (scenario.type) {
      const phrase = getRandomElement(scenaries[scenario.type][scenario.place]);
      setText(phrase);
    }
    if (scenario.music) {
      // setMusicUrl(scenario.music);
      // setMusicUrl(scenaries[scenario.type][scenario.music]);
      // audioRef.current.play();
      // [scenario.music].current.play();
      console.log([scenario.music]);
    }
  }, [scenario]);

  return (
    <div className={s.root}>
      {/* <audio ref={trueAnswer} src="/music/RightAnswer.wav" />
      <audio ref={falseAnswer} src="/music/WrongAnswer.wav" /> */}

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
