import React from "react";
import Link from "next/link";

import useScenarioTimer from "hooks/useScenarioTimer";
import useStore from "hooks/useStore";

import s from "./IvolgaRules.module.scss";

const IvolgaRules = ({ setGlobalState, socket }) => {
  useScenarioTimer("menu", "time15", 15);

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
          <div className={s.togglecontainer}>
            Выберите режим управления в игре:
            <Toggle />
          </div>

          <div className={s.speechBubbleContainer}>
            <div className={s.triangle}></div>
            <div className={s.speechBubble}>
              Выделенная область поможет вам верно собрать поезд.
            </div>
          </div>

          <div className={s.imgContainer}>
            <img
              className={s.ivolgaImg}
              src="/images/IvolgaDetails/04W_alpha.png"
              alt="ivolga"
            />
          </div>

          <div className={s.containerBtn}>
            <Link href={"/"}>
              <button className={s.playBtn}>Все понятно! Я в игре</button>
            </Link>
          </div>
        </div>

        <div className={s.clouds}></div>
      </main>
    </>
  );
};
export default IvolgaRules;

const Toggle = () => {
  const { setLeap, isLeap } = useStore();

  const handleToggle = () => {
    setLeap(!isLeap);
  };


  return (
    <label className={s.switch}>
      <input type="checkbox" checked={isLeap} onChange={handleToggle} />
      <span className={`${s.slider} ${isLeap ? s.on : s.off}`}>
        <span className={s.offText}>С помощью сенсорного экрана</span>
        <span className={s.onText}>С помощью жестов</span>
      </span>
    </label>
  );
};
