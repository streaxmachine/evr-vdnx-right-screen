import React from "react";
import Link from "next/link";

import s from "../Home.module.scss";

const FailMessage = ({
  setScenario,
  setDisableTimer,
  router,
  setTimeEndGame,
  setResetGame,
}) => {
  const [isShow, setShow] = React.useState(false);

  React.useEffect(() => {
    setScenario({ type: "ivolga", place: "timeEnd" });
    setDisableTimer(true);

    const timeout = setTimeout(() => {
      setTimeEndGame(true);
      setShow(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {isShow && (
        <div className={s.failMessageRoot}>
          <div className={s.failMessageWrapper}>
            <img
              src="/images/train/Icon.png"
              alt="время вышло"
              className={s.failMessageWrapper_img}
            />
            <p className={s.failMessageWrapper_title}>Игра завершена!</p>
            <p className={s.failMessageWrapper_text}>
              Вы не успели собрать Иволгу, но не расстраивайтесь, вы попробовали
              и это уже отличный результат! Сыграйте еще раз или выберите другую
              игру. Уверены, в следующий раз будет еще лучше!
            </p>

            <div
              className={s.failMessageWrapper_button}
              onClick={() => {
                setResetGame(true);
                router.reload();
              }}
            >
              <p>Начать заново</p>
            </div>

            <Link href={"/quizNew"}>
              <div
                className={`${s.failMessageWrapper_button} ${s.button_blue}`}
              >
                <p>Главное меню</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(FailMessage);
