import React from "react";

import s from "../aiChat.module.scss";

const Helper = React.memo(({}) => {
  return (
    <>
      <div className={s.helperRoot}>
        <div className={s.aiChat}></div>

        <div className={s.container}>
          <div className={s.triangle}></div>
          <div className={s.speechBubble}>
            <h3 className={s.speechBubbleTitle}>Чем я могу помочь?</h3>
            <span className={s.speechBubbleText}>
              Поговорите с виртуальным помощником Иволга – искусственным
              интеллектом, который знает о Тверской области практически все.
              Побеседовать с Иволгой можно с помощью микрофона или виртуальной
              клавиатуры.
            </span>
          </div>
        </div>
      </div>
    </>
  );
});

export default Helper;
