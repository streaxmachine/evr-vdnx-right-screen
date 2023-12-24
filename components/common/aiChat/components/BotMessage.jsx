import React, { useState, useEffect } from "react";
import s from "../aiChat.module.scss";
import axios from "axios";
import Lottie from "lottie-react";
import waiting from "./waiting.json";

export default function BotMessage({
  fetchMessage,
  BotMessage,
  setBotMessage,
}) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadMessage = async () => {
      setLoading(true);

      axios
        .post(`https://tverai.onrender.com/generate`, {
          text: fetchMessage,
        })
        .then((res) => {
          setMessage(res.data.message);
          setLoading(false);
        });
    };
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className={s.message_container}>
      {!isLoading && (
        <div className={s.bot_message}>{isLoading ? "..." : message}</div>
      )}
      {isLoading && (
        <Lottie
          className={s.waiting}
          animationData={waiting}
          loop={true}
          autoplay={true}
        />
      )}
    </div>
  );
}
