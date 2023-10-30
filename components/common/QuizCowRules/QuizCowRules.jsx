import React, { useState, useEffect } from "react";

import { cards } from "./cardInformation";

import s from "./QuizCowRules.module.scss";
import useScenarioTimer from "hooks/useScenarioTimer";

const QuizCardRules = ({ setGlobalState, socket }) => {
  useScenarioTimer("menu", "time15", 15);
  return (
    <>
      <main className={s.root}>
        <div className={s.wrapper}>
          <button
            className={s.backBtn}
            onClick={() => {
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
                Привет, маленькие исследователи мира молока! <p> Сегодня мы
                отправимся в увлекательное путешествие, чтобы узнать, откуда оно
                берется и как попадает в ваш холодильник.</p>
              </div>
              <div className={s.text}>
                Викторина "Молоко: от поля до стола" состоит из 14 увлекательных вопросов,
                и у вас есть 4 минуты, чтобы дать ответы. Готовы начать это
                захватывающее приключение? Поехали!"
              </div>
              <button
                className={s.playBtn}
                onClick={() => {
                  setGlobalState("touchPanelCow");
                  console.log("clicked");
                }}
              >
                Все понятно! Я в игре
              </button>
            </div>
            <img className={s.cowIMG} src="/images/QuizCowRules/cow.png" alt="Корова" />
          </section>
        </div>

        <div className={s.clouds}></div>
      </main>
    </>
  );
};
export default QuizCardRules;

// function Card({ card }) {
//   return (
//     <div className={`${s.card}`}>
//       <div className={s.cardTextBlock}>
//         <h4 className={s.cardTitle}>{card.title}</h4>
//       </div>
//       <img className={s.cardPic} src={card.picSrc} alt={card.alt} />
//     </div>
//   );
// }
