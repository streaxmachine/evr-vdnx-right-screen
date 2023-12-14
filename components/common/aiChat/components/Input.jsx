import React, { useState } from "react";

import s from "../aiChat.module.scss";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { layout } from "./layout";

export default function Input({ onSend, setShowHelper, setInputVisible }) {
  const [text, setText] = useState("");
  const keyboardRef = React.useRef();

  const handleInputChange = (e) => {
    setText(e);
  };

  const onKeyPress = (e) => {
    if (e === "{enter}") {
      handleSend();
    }
  };

  const handleSend = () => {
    keyboardRef.current.clearInput();
    onSend(text);
    setShowHelper(false);
  };

  return (
    <div className={s.input}>
      <form onSubmit={handleSend}>
        <input type="text" onChange={handleInputChange} value={text} />
      </form>
      <KeyboardReact
        keyboardRef={(r) => (keyboardRef.current = r)}
        onKeyPress={onKeyPress}
        onChange={handleInputChange}
        layout={layout}
      />
    </div>
  );
}
