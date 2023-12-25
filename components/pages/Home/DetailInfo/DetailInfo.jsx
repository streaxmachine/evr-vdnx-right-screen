import React from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { phrases } from "../phrases";
import { details } from "../details";

import s from "../Home.module.scss";

const boxAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.75, ease: "easeOut", delay: 0.45 },
  key: "start",
  exit: { opacity: 0, transition: { duration: 0.35 } },
};

const DetailInfo = React.memo(
  ({ detailNumber, count, setPauseTimer, isShowPopUp, setShowPopUp }) => {
    const rootRef = React.useRef();
    const [isShow, setShow] = React.useState(true);
    const [text, setText] = React.useState(phrases[1].text);
    const detail = React.useMemo(() => {
      if (count === detailNumber + 1) {
        return details.filter((item) => item.id === detailNumber + 1);
      } else {
        return details.filter((item) => item.id === detailNumber);
      }
    }, [detailNumber, count]);

    React.useEffect(() => {
      if (!isShowPopUp) {
        setShow(false);
      } else {
        setShow(true);
      }
    }, [isShowPopUp]);

    React.useEffect(() => {
      setShowPopUp(true);
      // setShow(true);
      setPauseTimer(true);

      console.log("detailNumber", detailNumber, count);

      if (Number(detailNumber) !== Number(count - 1)) {
        if (Number(detailNumber) >= 11) {
          setText(
            "Кажется не подходит... Это деталь от другого транспортного средства"
          );
        } else {
          setText(phrases[count].errorText);
        }
      } else {
        setText(phrases[count].text);
      }
    }, [count, detailNumber]);

    return (
      <>
        <AnimatePresence>
          {isShow && (
            <motion.div
              {...boxAnimation}
              ref={rootRef}
              style={{
                justifyContent: count === 11 && "center",
                minHeight: count === 11 && "285rem",
              }}
              className={clsx(s.detailInfoRoot, {
                [s.correct]: Number(detailNumber) === Number(count - 1),
              })}
            >
              {Number(count) !== 11 && (
                <div
                  style={{
                    backgroundColor:
                      Number(detailNumber) !== Number(count - 1) &&
                      "rgba(180, 47, 47, 1)",
                  }}
                  className={s.whatDetail}
                >
                  {text +
                    `${
                      detailNumber >= 11 ? ". " + phrases[count].errorText : ""
                    }` +
                    ""}
                </div>
              )}

              {Number(count) === 11 ? (
                <div className={s.detailsName}>
                  <div className={s.successMessage}>
                    <p> Поздравляем!</p>
                    <p>Вы успешно собрали «Иволгу!»</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* {Number(detailNumber) === Number(count - 1) && ( */}
                  <div className={s.detailsName}>{detail[0]?.name}</div>
                  {detailNumber < 11 && (
                    <div className={s.detailCounter}>
                      {detailNumber + " из 10"}
                    </div>
                  )}

                  {/* )} */}
                </>
              )}

              {count !== 11 && (
                <>
                  <img
                    className={s.detailsImg}
                    src={detail[0]?.picSrc}
                    alt={detail[0]?.alt}
                  />
                </>
              )}

              {count !== 11 && (
                <>
                  {Number(detailNumber) === Number(count - 1) ? (
                    <div className={s.detailsText}>
                      {detail[0]?.description}
                    </div>
                  ) : (
                    <>
                      {detailNumber >= 11 ? (
                        <div className={s.detailsText}>
                          {detail[0]?.description}
                        </div>
                      ) : (
                        <div className={s.detailsText}>
                          Выбранная вами деталь должна устанавливаться позже
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              <button
                onClick={() => {
                  // setShow(false);
                  setShowPopUp(false);
                  setPauseTimer(false);
                }}
                style={{
                  backgroundColor:
                    Number(detailNumber) !== Number(count - 1) &&
                    "rgba(180, 47, 47, 1)",
                }}
                className={s.detailConfirmButton}
              >
                {Number(detailNumber) > 10 && "Попробовать еще раз"}
                {Number(detailNumber) < 11
                  ? Number(count) !== 11
                    ? "Найти деталь"
                    : "Рассмотреть «Иволгу»"
                  : ""}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

export default DetailInfo;
