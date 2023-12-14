import React, { useState, useEffect } from "react";
import s from "../aiChat.module.scss";
import axios from "axios";

export default function BotMessage({ fetchMessage }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(fetchMessage);
    const loadMessage = async () => {
      axios
        .post(`http://127.0.0.1:5000/generate`, {
          text: fetchMessage,
        })
        .then((res) => {
          setMessage(res.data.message);
        });
      setLoading(false);
    };
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className={s.message_container}>
      <div className={s.bot_message}>{isLoading ? "..." : message}</div>
    </div>
  );
}
