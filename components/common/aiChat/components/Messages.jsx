import React, { useEffect, useRef } from "react";

import s from "../aiChat.module.scss";

export default function Messages({ messages }) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);
  return (
    <div className={s.messages}>
      <div className={s.messsageTest}>
        {messages}
        <div id={"el"} ref={el} />
      </div>
    </div>
  );
}
