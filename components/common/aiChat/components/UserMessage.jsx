import React from "react";
import Lottie from "lottie-react";
import axios from "axios";
import waiting from "./waiting.json";
import { AnimatePresence, motion } from "framer-motion";

import s from "../aiChat.module.scss";

const boxAnimation = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
  key: "start",
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function UserMessage({ text, message, setMessage }) {
  const [isLoading, setLoading] = React.useState(true);
  const [userMessage, setUserMessage] = React.useState(true);

  React.useEffect(() => {
    const loadMessage = async () => {
      setLoading(true);

      axios
        .post(`https://tverai.onrender.com/user_moderation`, {
          text,
        })
        .then((res) => {
          setUserMessage(res.data.message);
          setMessage(res.data.message);
          setLoading(false);
        });
    };
    loadMessage();
  }, [text]);

  return (
    <div className={s.message_container}>
      <AnimatePresence>
        {!isLoading && (
          <motion.div {...boxAnimation} className={s.user_message}>
            {isLoading ? "..." : userMessage}
          </motion.div>
        )}
        {isLoading && (
          <Lottie
            style={{ float: "right" }}
            className={s.waiting}
            animationData={waiting}
            loop={true}
            autoplay={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
