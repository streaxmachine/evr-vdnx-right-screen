import React from "react";

import s from "./Cards.module.scss";

const GuideSecond = ({ setState, socket }) => {
  const cards = [
    {
      title: "Путевой дворец",
      text: "Значимость этих проблем настолько очевидна, что внедрение современных методик требует анализа новых.",
      picSrc: "/images/putevoi.png",
      alt: "Путевой дворец",
      zigZagSrc: "/images/zigzag.png",
      onClick: () => {
        setState(3);
        socket.send(
          JSON.stringify({
            installation: "velo",
            type: "level",
            data: "level1_start",
          })
        );
      },
    },
    {
      title: "Музей России",
      text: "Значимость этих проблем настолько очевидна, что внедрение современных методик требует анализа новых.",
      picSrc: "/images/museum2.png",
      alt: "Музей России",
      zigZagSrc: "/images/zigzag.png",
      onClick: () => {
        setState(3);
        socket.send(
          JSON.stringify({
            installation: "velo",
            type: "level",
            data: "level2_start",
          })
        );
      },
    },
    {
      title: "Ржевский солдат",
      text: "Значимость этих проблем настолько очевидна, что внедрение современных методик требует анализа новых.",
      picSrc: "/images/soldier.png",
      alt: "Ржевский солдат",
      zigZagSrc: "/images/zigzag.png",
      onClick: () => {
        setState(3);
        socket.send(
          JSON.stringify({
            installation: "velo",
            type: "level",
            data: "level3_start",
          })
        );
      },
    },
  ];

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
            <div key={id} className={s.card} onClick={card.onClick}>
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
export default GuideSecond;
