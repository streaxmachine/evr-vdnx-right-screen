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
    console.log("hrer");
    onSend(text);
    handleClearInput();
    setShowHelper(false);
  };

  React.useEffect(() => {
    if (handleSendFromMic) {
      handleSend();
    }
  }, [handleSendFromMic]);

  return (
    <div className={s.input}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input type="text" onChange={handleInputChange} value={text} />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
