import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import Messages from "./Messages";
import Input from "./Input";

import s from "../aiChat.module.scss";

const boxAnimation = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
  key: "start",
  exit: { opacity: 0, y: 100, transition: { duration: 0.5 } },
};

const Chat = React.memo(
  ({
    setShowHelper,
    isInputVisible,
    setInputVisible,
    setText,
    text,
    handleSendFromMic,
    handleSendFromTemplate,
    handleClearInput,
  }) => {
    const [messages, setMessages] = React.useState([]);
    const [botMessage, setBotMessage] = React.useState("");

    const send = async (text) => {
      const newMessages = messages.concat(
        <UserMessage key={messages.length + 1} text={text} />,
        <BotMessage
          botMessage={botMessage}
          setBotMessage={setBotMessage}
          key={messages.length + 2}
          fetchMessage={text}
        />
      );
      setMessages(newMessages);
    };

    React.useEffect(() => {
      if (handleSendFromTemplate) {
        send(text);
        setTimeout(() => {
          setText("");
        }, 100);
      }
    }, [handleSendFromTemplate]);

    return (
      <>
        <div className={s.chatRoot}>
          <Messages messages={messages} text={text} />
          <AnimatePresence>
            {isInputVisible && (
              <motion.div className={s.inputWrapper} {...boxAnimation}>
                <Input
                  handleSendFromMic={handleSendFromMic}
                  handleClearInput={handleClearInput}
                  handleSendFromTemplate={handleSendFromTemplate}
                  text={text}
                  setText={setText}
                  onSend={send}
                  setShowHelper={setShowHelper}
                  setInputVisible={setInputVisible}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }
);

export default Chat;
