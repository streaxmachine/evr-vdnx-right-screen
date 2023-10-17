import React, { useState, useEffect } from "react";

import { cards } from "./cardInformation";

import s from "./QuizCards.module.scss";

const QuizCards = ({ setGlobalState, socket }) => {
  return (
    <>
      <main className={s.root}>
        <div className={s.wrapper}>
          <button
            className={s.backBtn}
            onClick={() => setGlobalState("firstPage")}
          >
            <img src="/images/arrow.png" alt="Назад" />
            <span className={s.backText}>Главное меню</span>
          </button>
          <div className={s.textblock}>
            <h2 className={s.title}>Сыграем?</h2>
            <span className={s.text}>Выбери игру</span>
          </div>
          <section className={s.cardsWrapper}>
            {cards.map((card, id) => (
              <Card
                card={card}
                socket={socket}
                key={id}
                id={id}
                setGlobalState={setGlobalState}
              />
            ))}
          </section>
          <div className={s.aiSection}>
            <div className={s.aiChat} />
          </div>
        </div>
        <div className={s.clouds}></div>
      </main>
    </>
  );
};
export default QuizCards;

function Card({ setGlobalState, card, socket }) {
  // const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className={`${s.card} ${s.clickedCard}`}
      onClick={() => {
        // setIsClicked(!isClicked);
        // setGlobalState(card.cardGlobalState)};
        setGlobalState(card.cardGlobalState);
        socket.send(
          JSON.stringify({
            installation: "right",
            type: "mode",
            data: "victorina",
          })
        );
      }}
    >
      <div className={s.cardTextBlock}>
        <p className={s.cardpreTitle}>{card.preTitle}</p>
        <h4 className={s.cardTitle}>{card.title}</h4>
        <p className={s.cardText}>{card.text}</p>
      </div>
      <img className={s.cardPic} src={card.picSrc} alt={card.alt} />
      <img className={s.cardZigZag} src={card.zigZagSrc} />
    </div>
  );
}
