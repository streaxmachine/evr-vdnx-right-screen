import React from "react";

import useScenarioTimer from "hooks/useScenarioTimer";

import { SoundsEmmitter } from "constants/events";

import s from "./QuizCowRules.module.scss";

const QuizCardRules = ({ setGlobalState, socket }) => {
  useScenarioTimer("menu", "time15", 15);
  return (
    <>
      <main className={s.root}>
        <div className={s.wrapper}>
          <button
            className={s.backBtn}
            onClick={() => {
              SoundsEmmitter.send("return-menu");
              setGlobalState("firstPage");
              socket.send(
                JSON.stringify({
                  installation: "right",
                  type: "mode",
                  data: "victorina_start",
                })
              );
            }}
          >
            <img src="/images/arrow.png" alt="Назад" />
            <span className={s.backText}>Главное меню</span>
          </button>

          <section className={s.content}>
            <div className={s.textblock}>
              <h2 className={s.title}>Правила игры</h2>
              <div className={s.text}>
                Привет, маленькие исследователи мира молока!
                <p>
                  Сегодня мы отправимся в увлекательное путешествие, чтобы
                  узнать, откуда оно берется и как попадает в ваш холодильник.
                </p>
              </div>
              <div className={s.text}>
                Викторина "Молоко: от поля до стола" состоит из 13 увлекательных
                вопросов, и у вас есть 4 минуты, чтобы дать ответы. Готовы
                начать это захватывающее приключение? Поехали!"
              </div>
              <button
                className={s.playBtn}
                onClick={() => {
                  setGlobalState("touchPanelCow");
                }}
              >
                Все понятно! Я в игре
              </button>
            </div>
            <img
              className={s.cowIMG}
              src="/images/QuizCowRules/cow.png"
              alt="Корова"
            />
          </section>
        </div>

        <div className={s.clouds}></div>
      </main>
    </>
  );
};
export default QuizCardRules;