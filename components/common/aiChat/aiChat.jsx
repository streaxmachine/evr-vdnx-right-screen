import React from "react";
import clsx from "clsx";

import Messages from "./components/Messages";
import Input from "./components/Input";
import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import API from "./chatAPI";

import s from "./aiChat.module.scss";

const AIChat = ({ setGlobalState, socket }) => {
  const [showHelper, setShowHelper] = React.useState(true);
  const [isInputVisible, setInputVisible] = React.useState(false);
  const [isListening, setListening] = React.useState(false);

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  const toggleListening = () => {
    setListening(!isListening);
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <section className={s.left}>
          <button
            onClick={() => {
              setGlobalState("firstPage");
              socket.send(
                JSON.stringify({
                  installation: "right",
                  type: "mode",
                  data: "menu",
                })
              );
            }}
            className={s.backMenu}
          >
            <img src="/images/aiChat/arrow.png" alt="Назад" />
            <span className={s.backText}>Главное меню</span>
          </button>
        </section>
        <section className={s.right}>
          <div className={s.title}>Иволга</div>

          {showHelper && <Helper />}

          <Chat setShowHelper={setShowHelper} isInputVisible={isInputVisible} setInputVisible={setInputVisible} />
        </section>
        <section className={s.bottom}>
          <div className={s.bottomPart}>
            <div
              className={isListening ? s.listeningIcon : s.icon}
              onMouseDown={() => toggleListening(true)}
            >
              {isListening ? (
                <img src="/images/aiChat/left_listening.svg" alt="" />
              ) : (
                <img src="/images/aiChat/left.svg" alt="" />
              )}
            </div>
            <span className={isListening ? s.listeningText : s.bottomText}>
              {isListening
                ? "Говорите..."
                : "Нажмите и удерживайте иконку микрофона, чтобы озвучить запрос"}
            </span>
          </div>
          <div className={s.bottomPart}>
            <div className={s.icon} onClick={() => toggleInputVisibility()}>
              <img src="/images/aiChat/right.svg" alt="" />
            </div>
            <span className={s.bottomText}>
              Если вокруг достаточно шумно, воспользуйтесь виртуальной
              клавиатурой
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(AIChat);

const Chat = React.memo(({ setShowHelper, isInputVisible , setInputVisible }) => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await API.GetChatbotResponse("hi")}
        />,
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async (text) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
  };
  return (
    <>
      <div className={s.chatRoot}>
        <Messages messages={messages} />
        {isInputVisible && (
          <Input onSend={send} setShowHelper={setShowHelper} setInputVisible={setInputVisible} />
        )}
      </div>
    </>
  );
});

const Helper = React.memo(({}) => {
  return (
    <>
      <div className={s.helperRoot}>
        <div className={s.aiChat}></div>

        <div className={s.container}>
          <div className={s.triangle}></div>
          <div className={s.speechBubble}>
            <h3 className={s.speechBubbleTitle}>Чем я могу помочь?</h3>
            <span className={s.speechBubbleText}>
              Поговорите с виртуальным помощником Иволга – искусственным
              интеллектом, который знает о Тверской области практически все.
              Побеседовать с Иволгой можно с помощью микрофона или виртуальной
              клавиатуры.
            </span>
          </div>
        </div>
      </div>
    </>
  );
});
