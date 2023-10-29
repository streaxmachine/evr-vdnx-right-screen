import React from "react";
import clsx from "clsx";

import TimeMenu from "../TimeMenu";
import Questions from "../Questions.jsx";

import useStore from "hooks/useStore";

import s from "./TouchPanel.module.scss";

const TouchPanel = ({ setGlobalState, socket }) => {
  const [currentCategory, setCurrentCategory] = React.useState(0);
  const [isQuizDone, setQuizDone] = React.useState(false);
  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);
  const { setScenario } = useStore();

  return (
    <div className={s.root}>
      <div className={s.container}>
        {!isQuizDone && (
          <div className={s.left}>
            <button
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
              className={s.backMenu}
            >
              <img src="/images/arrow.png" alt="Назад" />
              <span className={s.backText}>Главное меню</span>
            </button>
            <TimeMenu
              time={time}
              setTime={setTime}
              setQuizDone={setQuizDone}
              isQuizDone={isQuizDone}
            />
            <WayMenu currentCategory={currentCategory} />
          </div>
        )}
        <div
          className={clsx(s.right, isQuizDone && s.rightDone)}
          style={{
            backgroundImage: `url(${
              currentCategory === 0
                ? "/images/img.png"
                : currentCategory === 1
                ? "/images/img2.png"
                : currentCategory === 2
                ? "/images/img3.png"
                : currentCategory === 3
                ? "/images/img4.png"
                : "/images/img4.png"
            })`,
          }}
        >
          <Questions
            isQuizDone={isQuizDone}
            socket={socket}
            time={time}
            setScenario={setScenario}
            setQuizDone={setQuizDone}
            setGlobalState={setGlobalState}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TouchPanel);

const circles = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const places = [
  {
    name: "Тверская область в деталях",
    id: 0,
  },
  {
    name: "Звезды в Твери",
    id: 1,
  },
  {
    name: "Цифры",
    id: 2,
  },
  {
    name: "Рекорды и факты",
    id: 3,
  },
];

const WayMenu = React.memo(({ currentCategory }) => {
  return (
    <>
      <div className={s.wayMenuRoot}>
        <div className={s.wayMenu}>
          {circles.map((item, index) => {
            return (
              <div key={index} className={clsx(s.way, {})}>
                <div
                  className={clsx(s.circle, {
                    [s.active]: item.id <= currentCategory,
                  })}
                ></div>
                {item.id !== 3 && (
                  <div
                    className={clsx(s.line, {
                      [s.active]: item.id <= currentCategory - 1,
                    })}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        <div className={s.wayMenuPlaces}>
          {places.map((item, index) => (
            <div key={index} className={s.way}>
              <div
                className={clsx(s.way, {
                  [s.activeText]: item.id <= currentCategory,
                  [s.nonActiveText]: item.id > currentCategory,
                })}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
