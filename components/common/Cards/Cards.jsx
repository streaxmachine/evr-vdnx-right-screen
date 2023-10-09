import React from "react";

import { cards } from "./cardInformation";

import s from "./Cards.module.scss";

const Cards = ({ setState, socket, setisBack }) => {
  return (
    <>
      <main className={s.page}>
        <div
          onClick={() => {
            setState(1);
          }}
          className={s.navigationBack}
        >
          <img className={s.arrow} src="/images/arrow.png" alt="Назад" />{" "}
          <span className={s.textBack}>Главное меню</span>
        </div>
        <div className={s.textblock}>
          <h2 className={s.title}>Прокатись по Тверскому региону</h2>
          <span className={s.text}>Выберите маршрут</span>
        </div>
        <section className={s.cards}>
          {cards.map((card, id) => (
            <div
              key={id}
              className={s.card}
              onClick={() => {
                setisBack(false);
                setState(3);
                socket.send(JSON.stringify(card.info));
              }}
            >
              <h4 className={s.cardTitle}>{card.title}</h4>
              <p className={s.cardText}>{card.text}</p>
              <img className={s.cardPic} src={card.picSrc} alt={card.alt} />
              <img className={s.cardZigZag} src={card.zigZagSrc} />
            </div>
          ))}
        </section>
      </main>
    </>
  );
};
export default Cards;
