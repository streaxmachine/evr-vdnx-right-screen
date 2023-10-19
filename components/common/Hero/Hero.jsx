import React from "react";

import s from "./Hero.module.scss";

const Hero = ({ setState, socket }) => {
  return (
    <>
      <main className={s.page}></main>
      <div className={s.textblock}>
        <h2 className={s.title}>
          Прокатитесь по Тверской <p>области!</p>
        </h2>
        <span className={s.text}>
          Посетите важные культурные достопримечательности и узнайте
          <p>интересные факты. После выбора маршрута, держитесь за руль</p>и
          крутите педали.
        </span>
        <button
          onClick={() => {
            setState("cards");
            socket.send(
              JSON.stringify({
                installation: "velo",
                type: "level",
                data: "splashscreen",
              })
            );
          }}
          className={s.button}
        >
          Поехали
        </button>
      </div>
      <section className={s.imgContainer}>
        <img className={s.img0} src="/images/cards/most.png" alt="Зигзаг" />
        <img className={s.img1} src="/images/background/q_zig.png"></img>
        <div className={s.clouds}></div>
      </section>
    </>
  );
};
export default Hero;
