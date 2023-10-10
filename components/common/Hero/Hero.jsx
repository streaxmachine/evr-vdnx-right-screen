import React from "react";

import s from "./Hero.module.scss";

const Guide = ({ setState }) => {
  return (
    <>
      <main className={s.page}></main>
      <div className={s.textblock}>
        <h2 className={s.title}>
          Сядь на велосипед <p>и прокатись по Тверскому </p>региону
        </h2>
        <span className={s.text}>
          Готовы отправиться в увлекательное путешествие? Сядь на велосипед
          <p>
            {" "}
            и прокатись по Тверскому региону, исследуя его удивительные места
          </p>{" "}
          и богатое наследие. Приключение ждет тебя! Давай начнем!
        </span>
        <button
          onClick={() => {
            setState(2);
          }}
          className={s.button}
        >
          Поехали
        </button>
      </div>
      <section className={s.imgContainer}>
        <img
          className={s.img1}
          src="/images/Group 24.png"
          alt="Ржевский солдат"
        />
        <img className={s.img2} src="/images/Group 25.png" alt="Музей Россим" />
        <img
          className={s.img3}
          src="/images/Group 27.png"
          alt="Путевой дворец"
        />
      </section>
    </>
  );
};
export default Guide;
