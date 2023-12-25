import React from "react";

import useScenarioTimer from "hooks/useScenarioTimer";

import { SoundsEmmitter } from "constants/events";

import s from "./QuizCowRules.module.scss";

const QuizCardRules = ({ setGlobalState, socket }) => {
  useScenarioTimer("menu", "time15", 15);
  const [quizState, setQuizState] = React.useState("");
  return (
    <>
      <main className={s.root}>
        <div className={s.wrapper}>
          <button
            className={s.backBtn}
            onClick={() => {
              SoundsEmmitter.send("return-menu");
              setGlobalState("firstPage");
              // socket.send(
              //   JSON.stringify({
              //     installation: "right",
              //     type: "mode",
              //     data: "victorina_start",
              //   })
              // );
            }}
          >
            <img src="/images/arrow.png" alt="Назад" />
            <span className={s.backText}>Главное меню</span>
          </button>

          <section className={s.content}>
            <div className={s.textblock}>
              <h2 className={s.title}>Правила игры</h2>
              <div className={s.text}>
                Приветствуем вас, маленькие исследователи фермерского дела!
              </div>
              <div className={s.text}>
                Давайте вместе отправимся в увлекательное приключение, раскрывая
                тайны животноводства. У нас есть Фермерский квест с двумя
                викторинами: "Молоко: от поля до стола" и "Приключения свинок".
                В первой вы узнаете, как молоко попадает к вам на стол, а во
                второй - о жизни веселых свинок и их роли в фермерском
                хозяйстве.
              </div>
              <div className={s.text}>
                Правила игры просты: вас ждут 12-13 увлекательных вопросов,
                ответить на которые нужно за 4 минуты. Готовы начать это
                захватывающее приключение? Поехали!
              </div>

              <div className={s.togglecontainer}>
                Во что будем играть?
                <Toggle setQuizState={setQuizState} />
              </div>
              <div className={s.buttonContainer}>
                <button
                  className={s.playBtn}
                  onClick={() => {
                    // setGlobalState("touchPanelCow");
                    setGlobalState(quizState);
                  }}
                >
                  Все понятно! Я в игре
                </button>
              </div>
            </div>
            {quizState === 'touchPanelCow' ? (
              <img
                className={s.cowIMG}
                src="/images/QuizCowRules/cow.png"
                alt="Корова"
              />
            ) : (
              <img
                className={s.pigIMG}
                src="/images/QuizCowRules/PIG.png"
                alt="свинка"
              />
            )}
          </section>
        </div>
        <section className={s.footerLogo}>
          <img src="/images/quizCow/AP.png" alt="" />
          <img src="/images/quizCow/BG1.png" alt="" />
          <img
            src="/images/quizCow/Iskrenne.png"
            alt=""
            style={{
              width: "74rem",
              height: "74rem",
              transform: "translateY(-4rem)",
            }}
          />
          <img
            src="/images/QuizCowRules/Coral_logo.png"
            alt=""
            style={{
              width: "158px",
              height: "183px",
              transform: "translateY(-42rem)",
            }}
          />
        </section>
        <div className={s.whiteGradient}></div>
        <div className={s.clouds}></div>
      </main>
    </>
  );
};
export default QuizCardRules;

const Toggle = ({ setQuizState }) => {
  const [isPig, setPig] = React.useState(false);

  const handleToggle = () => {
    setPig(!isPig);
  };

  React.useEffect(() => {
    if (isPig) {
      setQuizState("touchPanelPig");
    } else {
      setQuizState("touchPanelCow");
    }
  }, [isPig]);

  return (
    <label className={s.switch}>
      <input type="checkbox" checked={isPig} onChange={handleToggle} />
      <span className={`${s.slider} ${isPig ? s.on : s.off}`}>
        <span className={s.offText}>Молоко: от поля до стола</span>
        <span className={s.onText}>Приключения свинок</span>
      </span>
    </label>
  );
};
