import React from "react";

import s from "../aiChat.module.scss";

export default function UserMessage({ text }) {
  return (
    <div className={s.message_container}>
      <div className={s.user_message}>{text}</div>
    </div>
  );
}
