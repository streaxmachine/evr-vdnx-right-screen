import React, { useState, useEffect } from "react";

import { cards } from "./cardInformation";

import s from "./QuizRules.module.scss";

const QuizRules = ({ setGlobalState, socket }) => {
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
          <div className={s.textblock}>
            <h2 className={s.title}>Правила игры</h2>
            <span className={s.text}>
              Вам предстоит проверить свои знания о Тверской области. Вас ждет
              12 вопросов, поделенных на 4 категории. Игра продолжается до тех
              пор, пока не окончится время. Постарайтесь дать как можно больше
              правильных ответов. После завершения игры вы сможете получить приз
              у промоутера стенда! Удачи!
            </span>
          </div>
          <section className={s.cardsWrapper}>
            {cards.map((card, id) => (
              <Card card={card} key={id} id={id} />
            ))}
          </section>

          <button
            className={s.playBtn}
            onClick={() => {
              setGlobalState("touchPanel");
              console.log("clicked");
            }}
          >
            Все понятно! Я в игре
          </button>

        </div>

        <div className={s.clouds}></div>
      </main>
    </>
  );
};
export default QuizRules;

function Card({ card }) {
  return (
    <div className={`${s.card}`}>
      <div className={s.cardTextBlock}>
        <h4 className={s.cardTitle}>{card.title}</h4>
      </div>
      <img className={s.cardPic} src={card.picSrc} alt={card.alt} />
    </div>
  );
}
