import React from "react";
import KeyboardReact from "react-simple-keyboard";

import RecordingButton from "./components/RecordingButton";
import Helper from "./components/Helper";
import Chat from "./components/Chat";

import { layout } from "./components/layout";

import s from "./aiChat.module.scss";
import MessageTemplates from "./components/MessageTemplates";

const AIChat = ({ setGlobalState, socket }) => {
  const [showHelper, setShowHelper] = React.useState(true);
  const [isInputVisible, setInputVisible] = React.useState(false);
  const [isKeyBoardVisible, setKeyBoardVisible] = React.useState(false);
  const [handleSendFromMic, setHandleSendFromMic] = React.useState(false);
  const [handleSendFromTemplate, setHandleSendFromTemplate] =
    React.useState(false);

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };
  const keyboardRef = React.useRef();
  const [text, setText] = React.useState("");

  const handleInputChange = (e) => {
    setText(e);
  };

  const handleClearInput = () => {
    if (keyboardRef.current) {
      keyboardRef.current.clearInput();
    }
    setText("");
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
          {showHelper && (
            <MessageTemplates
              setHandleSendFromTemplate={setHandleSendFromTemplate}
              setText={setText}
              setShowHelper={setShowHelper}
            />
          )}
          <Chat
            handleClearInput={handleClearInput}
            handleSendFromMic={handleSendFromMic}
            text={text}
            handleSendFromTemplate={handleSendFromTemplate}
            setText={setText}
            setShowHelper={setShowHelper}
            isInputVisible={isInputVisible}
            setInputVisible={setInputVisible}
          />
        </section>
        <section className={s.bottom}>
          <RecordingButton
            setShowHelper={setShowHelper}
            handleSendFromMic={handleSendFromMic}
            setHandleSendFromMic={setHandleSendFromMic}
            text={text}
            setText={setText}
            toggleInputVisibility={toggleInputVisibility}
          />
          <div className={s.bottomPart}>
            <div
              className={s.icon}
              onClick={() => {
                setShowHelper(false);
                toggleInputVisibility();
                setKeyBoardVisible(true);
              }}
            >
              <img src="/images/aiChat/right.svg" alt="" />
            </div>
            <span className={s.bottomText}>
              Если вокруг достаточно шумно, воспользуйтесь виртуальной
              клавиатурой
            </span>
          </div>
          {isKeyBoardVisible && (
            <div className={s.keyBoard}>
              <button
                className={s.keyBoardBtn}
                onClick={() => {
                  toggleInputVisibility();

                  setKeyBoardVisible(false);
                }}
              >
                Закрыть
              </button>
              <KeyboardReact
                keyboardRef={(r) => (keyboardRef.current = r)}
                // onKeyPress={handleKeyPress}
                onChange={handleInputChange}
                layout={layout}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default React.memo(AIChat);
