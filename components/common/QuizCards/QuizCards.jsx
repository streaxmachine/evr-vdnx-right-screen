import React, { useState, useEffect } from "react";
import Link from "next/link";

import { cards } from "./cardInformation";

import useStore from "hooks/useStore";

import s from "./QuizCards.module.scss";
import useScenarioTimer from "hooks/useScenarioTimer";

const QuizCards = ({ setGlobalState, socket }) => {
  const { setScenario } = useStore();

  useScenarioTimer("menu", "cards10Sec", 10);

  React.useEffect(() => {
    setScenario({ type: "menu", place: "cards" });
  }, []);

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
        socket.send(JSON.stringify(card.info));
      }}
    >
      {card.title === "Собери Иволгу" ? (
        <>
          <Link href="/">
            <div className={s.cardTextBlock}>
              <p className={s.cardpreTitle}>{card.preTitle}</p>
              <h4 className={s.cardTitle}>{card.title}</h4>
              <p className={s.cardText}>{card.text}</p>
            </div>
            <img className={s.cardPic} src={card.picSrc} alt={card.alt} />
            <img className={s.cardZigZag} src={card.zigZagSrc} />
          </Link>
        </>
      ) : (
        <>
          <div className={s.cardTextBlock}>
            <p className={s.cardpreTitle}>{card.preTitle}</p>
            <h4 className={s.cardTitle}>{card.title}</h4>
            <p className={s.cardText}>{card.text}</p>
          </div>
          <img className={s.cardPic} src={card.picSrc} alt={card.alt} />
          <img className={s.cardZigZag} src={card.zigZagSrc} />
        </>
      )}
    </div>
  );
}
