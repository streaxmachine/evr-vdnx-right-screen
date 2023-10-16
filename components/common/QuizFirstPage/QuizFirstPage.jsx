import React from "react";

import s from "./QuizFirstPage.module.scss";

const Guide = ({ setGlobalState }) => {
  return (
    <>
      <main className={s.page}>
        <div className={s.clouds}></div>
        <div className={s.textblock}>
          <h2 className={s.title}>
            Приветствуем вас
            <p>в игровой зоне!</p>
          </h2>
          <span className={s.text}>
            Знакомьтесь с проектами Тверской области в игровом формате
            <p> и получите возможность выиграть приз!</p>
          </span>
          <button
            onClick={() => {
              setGlobalState(2);
            }}
            className={s.button}
          >
            Выбрать игру
          </button>
        </div>
        <section className={s.imgContainer}>
          <img
            className={s.img0}
            src="/images/background/q_zig.png"
            alt="Зигзаг"
          />
          <div className={s.aiChat} />
          <div className={s.speechBubble}>
            AI comment AI comment AI comment AI comment AI comment{" "}
          </div>
        </section>
      </main>
    </>
  );
};
export default Guide;
