import React from "react";

import regeneratorRuntime from "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import s from "../aiChat.module.scss";

const RecordingButton = React.memo(
  ({
    toggleInputVisibility,
    setText,
    setShowHelper,
    setHandleSendFromMic,
    isInputVisible,
  }) => {
    const { transcript, resetTranscript } = useSpeechRecognition({
      isFuzzyMatch: true,
      bestMatchOnly: true,
    });

    const [buttonClicked, setButtonClicked] = React.useState(false);
    const [isListening, setListening] = React.useState(false);

    const toggleListening = () => {
      setButtonClicked(true);
      setListening(!isListening);
    };

    React.useEffect(() => {
      if (transcript.length !== 0) {
        setText(transcript);
      }
    }, [transcript]);

    React.useEffect(() => {
      if (!isInputVisible) {
        SpeechRecognition.stopListening();
        setTimeout(() => {
          setListening(false);
          resetTranscript();
          setHandleSendFromMic(false);
          setText("");
        }, 100);
      }
    }, [isInputVisible]);

    React.useEffect(() => {
      if (buttonClicked) {
        if (isListening) {
          SpeechRecognition.startListening({
            continuous: true,
            language: "Ru-us",
          });
        } else {
          setHandleSendFromMic(true);

          SpeechRecognition.stopListening();
          setTimeout(() => {
            resetTranscript();
            setHandleSendFromMic(false);
            setText("");
          }, 100);
        }
      }
    }, [isListening, buttonClicked]);

    return (
      <>
        <div className={s.bottomPart}>
          <div
            className={isListening ? s.listeningIcon : s.icon}
            onPointerLeave={() => {
              if (isListening) {
                SpeechRecognition.stopListening();

                setTimeout(() => {
                  setHandleSendFromMic(false);
                  toggleInputVisibility();
                }, 250);
                setTimeout(() => {
                  resetTranscript();
                  setText("");
                }, 500);
                setListening(false);
              }
            }}
            onPointerDown={() => {
              SpeechRecognition.startListening({
                continuous: true,
                language: "Ru-us",
              });
              resetTranscript();
              setText("");
              setShowHelper(false);
              setListening(true);
              toggleInputVisibility();
            }}
            onPointerUp={() => {
              if (transcript.length !== 0) {
                setHandleSendFromMic(true);
              }
              SpeechRecognition.stopListening();

              setTimeout(() => {
                setHandleSendFromMic(false);
                toggleInputVisibility();
              }, 250);
              setTimeout(() => {
                resetTranscript();
                setText("");
              }, 500);
              setListening(false);
            }}
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
      </>
    );
  }
);

export default RecordingButton;
