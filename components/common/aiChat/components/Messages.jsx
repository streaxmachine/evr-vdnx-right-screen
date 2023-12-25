import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import s from "../aiChat.module.scss";

const boxAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
  key: "start",
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function Messages({ messages }) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);
  return (
    <AnimatePresence>
      {messages && (
        <motion.div key={messages} {...boxAnimation} className={s.messages}>
          <div className={s.messsageTest}>
            {messages}
            <div id={"el"} ref={el} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
