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
                setScenario={setScenario}
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

function Card({ setGlobalState, card, socket, setScenario }) {
  // const [isClicked, setIsClicked] = useState(false);
  const isThirdCard = card.cardGlobalState === "5";

  const handleClick = () => {
    setScenario({ type: "menu", place: "chooseGame" });
    setGlobalState(card.cardGlobalState);
    // setIsClicked(!isClicked);
    // setGlobalState(card.cardGlobalState)};

    if (!isThirdCard) {
      socket.send(JSON.stringify(card.info));
    }
  };

  return (
    <div className={`${s.card} ${s.clickedCard}`} onClick={handleClick}>
      {isThirdCard ? (
        <Link href={"/quiz/"}>
          <>
            <div className={s.cardTextBlock}>
              <p className={s.cardpreTitle}>{card.preTitle}</p>
              <h4 className={s.cardTitle}>{card.title}</h4>
              <p className={s.cardText}>{card.text}</p>
            </div>
            <img className={s.cardPic} src={card.picSrc} alt={card.alt} />
            <img className={s.cardZigZag} src={card.zigZagSrc} />
          </>
        </Link>
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
