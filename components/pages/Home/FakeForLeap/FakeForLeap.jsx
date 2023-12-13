import React from "react";

import s from "./FakeForLeap.module.scss";
import { data } from "./data";

const FakeForLeap = ({ setTouchedDetail, setCount, count }) => {
  return (
    <div className={s.fake}>
      {data.map((item, id) => {
        return (
          <div
            key={id}
            style={{
              pointerEvents: item.id >= count ? "all" : "none",
            }}
            onClick={() => {
              setTouchedDetail(item.id);
              if (item.id === count) {
                setCount(count + 1);
              }
            }}
            className={item.className}
          ></div>
        );
      })}
    </div>
  );
};

export default React.memo(FakeForLeap);
