import React from "react";

import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import Messages from "./Messages";
import Input from "./Input";

import s from "../aiChat.module.scss";

const Chat = React.memo(
  ({
    setShowHelper,
    isInputVisible,
    setInputVisible,
    setText,
    text,
    handleSendFromMic,
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
    return (
      <>
        <div className={s.chatRoot}>
          <Messages messages={messages} text={text} />
          {isInputVisible && (
            <Input
              handleSendFromMic={handleSendFromMic}
              handleClearInput={handleClearInput}
              text={text}
              setText={setText}
              onSend={send}
              setShowHelper={setShowHelper}
              setInputVisible={setInputVisible}
            />
          )}
        </div>
      </>
    );
  }
);

export default Chat;
