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

      console.log("detailNumber", detailNumber);

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
              className={clsx(s.detailInfoRoot, {
                [s.correct]: Number(detailNumber) === Number(count - 1),
              })}
            >
              {Number(count) !== 11 && (
                <div className={s.whatDetail}>{text}</div>
              )}

              {Number(count) === 11 ? (
                <div className={s.detailsName}>
                  {"Поздравляем!"}
                  <p>{"Вы успешно собрали «Иволгу!»"}</p>
                </div>
              ) : (
                <>
                  {/* {Number(detailNumber) === Number(count - 1) && ( */}
                  <div className={s.detailsName}>{detail[0]?.name}</div>
                  {/* )} */}
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

              {count !== 11 && (
                <>
                  <img
                    className={s.detailsImg}
                    src={detail[0]?.picSrc}
                    alt={detail[0]?.alt}
                  />
                </>
              )}

              <img
                className={s.detailZig}
                alt="zig"
                src={
                  Number(detailNumber) === Number(count - 1)
                    ? "/images/train/line.png"
                    : "/images/train/line_red.png"
                }
              />

              {Number(detailNumber) >= 11 && (
                <div className={s.wrongDetailHelp}>
                  {phrases[count].errorText}
                </div>
              )}

              <button
                onClick={() => {
                  // setShow(false);
                  setShowPopUp(false);
                  setPauseTimer(false);
                }}
                style={{}}
                className={s.detailConfirmButton}
              >
                {Number(count) !== 11
                  ? "Играем дальше"
                  : "Рассмотреть «Иволгу»"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

export default DetailInfo;
