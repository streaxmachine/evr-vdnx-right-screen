import React from "react";
import Link from "next/link";
import s from "./Guide.module.scss";

const Guide = () => {
  return (
    <>
      <main className={s.page}>
        <Link href={"/guide"} className={s.navigationBack}>
          <img className={s.arrow} src="/images/arrow.png" alt="Назад" />{" "}
          <span className={s.textBack}>Главное меню</span>
        </Link>
        <div className={s.textblock}>
          <h2 className={s.title}>Прокатись по Тверскому региону</h2>
          <span className={s.text}>Выберите маршрут</span>
        </div>
        <section className={s.cards}>
          <div className={s.card}>
            <h4 className={s.cardTitle}>Путевой дворец</h4>
            <p className={s.cardText}>
              Значимость этих проблем настолько очевидна, что внедрение
              современных методик требует анализа новых.
            </p>
            <img
              className={s.cardPic}
              src="/images/putevoi.png"
              alt="Путевой дворец"
            ></img>
            <img className={s.cardZigZag} src="/images/zigzag.png"></img>
          </div>
          <div className={s.card}>
            <h4 className={s.cardTitle}>Музей России </h4>
            <p className={s.cardText}>
              Значимость этих проблем настолько очевидна, что внедрение
              современных методик требует анализа новых.
            </p>
            <img
              className={s.cardPicMuseum}
              src="/images/museum.png"
              alt="Музей России "
            ></img>
            <img className={s.cardZigZagMuseum} src="/images/zigzag.png"></img>
          </div>
          <div className={s.card}>
            <h4 className={s.cardTitle}>Ржевский солдат </h4>
            <p className={s.cardText}>
              Значимость этих проблем настолько очевидна, что внедрение
              современных методик требует анализа новых.
            </p>
            <img
              className={s.cardPicSoldier}
              src="/images/soldier.png"
              alt="Ржевский солдат "
            ></img>
            <img className={s.cardZigZagSoldier} src="/images/zigzag.png"></img>
          </div>
        </section>
      </main>
    </>
  );
};
export default Guide;
