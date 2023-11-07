import React, { useState, useEffect } from "react";
import s from "../aiChat.module.scss";

export default function BotMessage({ fetchMessage }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className={s.message_container}>
      <div className={s.bot_message}>{isLoading ? "..." : message}</div>
    </div>
  );
}
