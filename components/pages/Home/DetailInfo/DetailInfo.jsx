import React from "react";
import clsx from "clsx";

import { details } from "../details";

import s from "../Home.module.scss";

const DetailInfo = React.memo(({ detailNumber, count, setDisableTouch }) => {
  const rootRef = React.useRef();
  const detail = React.useMemo(() => {
    return details.filter((item) => item.id === detailNumber);
  }, [detailNumber]);
  React.useEffect(() => {
    setDisableTouch(true);
    rootRef.current.style.opacity = 1;
    const timeout = setTimeout(() => {
      rootRef.current.style.opacity = 0;
      if (Number(detailNumber) !== Number(count - 1)) {
        setDisableTouch(false);
      }
    }, 3000);
    clearTimeout(() => {
      clearTimeout(timeout);
    });
  }, [detailNumber, count]);

  return (
    <div
      ref={rootRef}
      className={clsx(s.detailInfoRoot, {
        [s.correct]: Number(detailNumber) === Number(count - 1),
      })}
    >
      <div className={s.detailsName}>{detail[0].name}</div>
      {Number(detailNumber) === Number(count - 1) ? (
        <div className={s.detailstext}>{detail[0].description}</div>
      ) : (
        <div className={s.detailstext}>Деталь установлена не по порядку</div>
      )}

      {/* <img
          className={s.detailsImg}
          src={detail[0].picSrc}
          alt={detail[0].alt}
        /> */}

      <img
        className={s.detailZig}
        alt="zig"
        src={
          Number(detailNumber) === Number(count - 1)
            ? "/images/train/line.png"
            : "/images/train/line_red.png"
        }
      />
    </div>
  );
});

export default DetailInfo;
