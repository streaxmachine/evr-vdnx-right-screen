import React from "react";
import Link from "next/link";

import s from "./IvolgaRules.module.scss";

const IvolgaRules = ({ setGlobalState, socket }) => {
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
            <h2 className={s.title}>Правила игры</h2>
            <span className={s.text}>
              Почувствуйте себя конструктором современного поезда! Вашей задачей
              станет сборка современного вагона Иволги.
              <p>
                Руководствуйтесь чертежом для того, чтобы определите из каких
                деталей состоит Иволга и в какой последовательности их нужно
                устанавливать. Всего необходимо установить 10 деталей за 3
                минуты.
              </p>
              Будьте внимательны, среди деталей есть совсем неподходящие. Игра
              станет настоящим испытанием вашей логики и эрудированности!
            </span>
          </div>

          <div className={s.imgContainer}>
            <div className={s.speechBubble}>
              Выделенная область и ее порядковый номер помогут вам верно собрать
              поезд.
            </div>
            <div className={s.lineWithcircles}>
              <div className={`${s.circleTop} ${s.top}`}>
                <p className={s.circleNumber}>1</p>
              </div>
              <div className={`${s.circle} ${s.bottom}`}></div>
            </div>

            <img
              className={s.ivolgaImg}
              src="/images/IvolgaRules/ivolga.png"
              alt="ivolga"
            />
          </div>

          <Link href={"/"}><button className={s.playBtn}>Все понятно! Я в игре</button></Link>
        </div>

        <div className={s.clouds}></div>
      </main>
    </>
  );
};
export default IvolgaRules;
