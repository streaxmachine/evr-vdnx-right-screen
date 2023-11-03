import React from "react";
import Head from "next/head";

import useStore from "hooks/useStore";

import s from "./QuizFirstPage.module.scss";

const Guide = ({ setGlobalState, socket }) => {
  const { setScenario } = useStore();
  React.useEffect(() => {
    setScenario({ type: "menu", place: "hello" });
  }, []);

  return (
    <>
      <main className={s.root}>
        <div className={s.wrapper}>
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
                setGlobalState("quizCards");
                socket.send(
                  JSON.stringify({
                    installation: "right",
                    type: "mode",
                    data: "menu",
                  })
                );
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
          </section>
        </div>
        <div className={s.clouds}></div>
      </main>
    </>
  );
};
export default Guide;
