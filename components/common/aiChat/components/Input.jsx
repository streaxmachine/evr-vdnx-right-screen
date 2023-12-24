import React, { useState } from "react";

import s from "../aiChat.module.scss";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { layout } from "./layout";

export default function Input({
  onSend,
  setShowHelper,
  handleClearInput,
  text,
  setText,
  handleSendFromTemplate,
  handleSendFromMic,
}) {
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = (e) => {
    handleClearInput();
    onSend(text);
    setShowHelper(false);
  };

  React.useEffect(() => {
    if (handleSendFromMic) {
      handleSend();
    }
  }, [handleSendFromMic]);

  return (
    <div className={s.input}>
      <form>
        <input type="text" onChange={handleInputChange} value={text} />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          Отправить
        </button>
      </form>
    </div>
  );
}
