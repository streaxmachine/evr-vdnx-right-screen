import React from "react";
import clsx from "clsx";

import TimeMenu from "../TimeMenu";
import Questions from "../Questions.jsx";

import s from "./TouchPanel.module.scss";

const TouchPanel = ({ setGlobalState }) => {
  const [currentCategory, setCurrentCategory] = React.useState(0);
  const [isQuizDone, setQuizDone] = React.useState(false);
  const [time, setTime] = React.useState("0" + 4 + "0:10" + 0);
  return (
    <div className={s.root}>
      <div className={s.container}>
        {!isQuizDone && (
          <div className={s.left}>
            <button
              onClick={() => setGlobalState("quizCards")}
              className={s.backMenu}
            >
              {"<  "}Главное меню
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
        <div className={clsx(s.right, isQuizDone && s.rightDone)}>
          <Questions
            isQuizDone={isQuizDone}
            time={time}
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
    name: "Волга матушка",
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