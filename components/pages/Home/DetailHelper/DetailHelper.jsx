import React from "react";
import gsap from "gsap";

import { phrases } from "../phrases";

import s from "../Home.module.scss";

const DetailHelpers = React.memo(({ count, setDisableTouch }) => {
  const rootRef = React.useRef();
  const [isShow, setShow] = React.useState(true);
  const [text, setText] = React.useState(phrases[1].text);
  React.useEffect(() => {
    if (count > 1) {
      gsap.to(rootRef.current, {
        opacity: 1,
        onStart: () => setDisableTouch(true),
        delay: 3,
      });
      gsap.to(rootRef.current, {
        opacity: 0,
        delay: 5,
        onComplete: () => setDisableTouch(false),
      });
    }
    setText(phrases[count].text);
    if (count === 11) {
      setShow(false);
    }
  }, [count]);
  return (
    <>
      <div ref={rootRef} className={s.detailHelperRoot}>
        {isShow && <div className={s.detailHelperWrapper}>{text}</div>}
      </div>
    </>
  );
});

export default DetailHelpers;
