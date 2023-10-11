import React, { useState, useEffect } from "react";

import { cards } from "./cardInformation";

import s from "./Cards.module.scss";

const Cards = ({ setState, socket, setisBack }) => {
  const [inactiveTime, setInactiveTime] = useState(0);

  const resetInactiveTime = () => {
    setInactiveTime(0);
  };

  useEffect(() => {
    const touchStartHandler = () => {
      resetInactiveTime();
    };

    const touchMoveHandler = () => {
      resetInactiveTime();
    };

    const timer = setInterval(() => {
      setInactiveTime(inactiveTime + 1);
    }, 1000);

    window.addEventListener("touchstart", touchStartHandler);
    window.addEventListener("touchmove", touchMoveHandler);

    return () => {
      clearInterval(timer);
      window.removeEventListener("touchstart", touchStartHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
    };
  }, [inactiveTime]);

  useEffect(() => {
    if (inactiveTime >= 20) {
      console.log("nobody`s here");
      setState(1);
    }
  }, [inactiveTime]);

  return (
    <>
      <main className={s.page}>
        <div className={s.pageLayer}></div>
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
          <h2 className={s.title}>Куда поедем?</h2>
          <span className={s.text}>Выбери маршрут</span>
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
              <div className={s.cardTextBlock}>
                <h4 className={s.cardTitle}>{card.title}</h4>
                <p className={s.cardText}>{card.text}</p>
              </div>
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
