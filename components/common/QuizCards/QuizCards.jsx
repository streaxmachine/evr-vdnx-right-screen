import React, { useState, useEffect } from "react";

import { cards } from "./cardInformation";

import s from "./Cards.module.scss";

const QuizCards = ({ setGlobalState }) => {
  return (
    <>
      <main className={s.root}>
        {/* <div className={s.backImg}></div> */}
        <div className={s.wrapper}>
          <div className={s.navigationBack}>
            <img className={s.arrow} src="/images/arrow.png" alt="Назад" />
            <span className={s.textBack}>Главное меню</span>
          </div>
          <div className={s.textblock}>
            <h2 className={s.title}>Сыграем?</h2>
            <span className={s.text}>Выбери игру</span>
          </div>
          <section className={s.cardsWrapper}>
            {cards.map((card, id) => (
              <Card
                card={card}
                key={id}
                id={id}
                setGlobalState={setGlobalState}
              />
            ))}
          </section>
          {/* <div className={s.aiSection}>
          <div className={s.aiChat} />
          <div className={s.speechBubble}>
            AI comment AI comment AI comment AI comment AI comment{" "}
          </div>
        </div> */}
        </div>
      </main>
    </>
  );
};
export default QuizCards;

function Card({ setGlobalState, card }) {
  // const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className={`${s.card}`}
      onClick={() => {
        // setIsClicked(!isClicked)
        setGlobalState(Number(card.cardNumber));
        console.log(card.cardNumber);
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
