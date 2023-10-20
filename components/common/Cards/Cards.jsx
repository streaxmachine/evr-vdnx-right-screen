import React, { useState, useEffect } from "react";

import useTimer from "hooks/useTimer";
import { cards } from "./cardInformation";

import s from "./Cards.module.scss";

const Cards = ({ setState, socket, setisBack }) => {
  const [card, setCard] = useState(null);
  const time = useTimer();
  useEffect(() => {
    if (time.inactive) {
      setState("hero");
    } else {
      return;
    }
  }, [time]);
  return (
    <>
      <div className={s.root}>
        <div className={s.pageLayer}></div>
        <div className={s.rootWrapper}>
          <div
            onClick={() => {
              setState("hero");
              socket.send(
                JSON.stringify({
                  installation: "velo",
                  type: "level",
                  data: "start_menu",
                })
              );
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
          <div className={s.cards}>
            {cards.map((card, id) => (
              <Card
                card={card}
                key={id}
                setState={setState}
                socket={socket}
                setisBack={setisBack}
                setCard={setCard}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Cards;

function Card({ setState, setisBack, setCard, socket, card }) {
  return (
    <div
      className={s.card}
      onClick={() => {
        setisBack(false);
        setState("progressBar");
        setCard(card.cardNumber);
        console.log(card.cardNumber);
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
  );
}
