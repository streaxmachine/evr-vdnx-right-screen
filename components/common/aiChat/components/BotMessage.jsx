import React, { useState, useEffect } from "react";
import s from "../aiChat.module.scss";
import axios from "axios";
import Lottie from "lottie-react";
import waiting from "./waiting.json";
import { AnimatePresence, motion } from "framer-motion";

const boxAnimation = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
  key: "start",
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

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
      <AnimatePresence>
        {!isLoading && (
          <motion.div {...boxAnimation} className={s.bot_message}>
            {isLoading ? "..." : message}
          </motion.div>
        )}
      </AnimatePresence>

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
