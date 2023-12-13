import React from "react";

import s from "./FakeForLeap.module.scss";
import { data } from "./data";

const FakeForLeap = ({ setTouchedDetail, setCount, count }) => {
  console.log(data);
  return (
    <div className={s.fake}>
      {data.map((item, id) => {
        return (
          <div
            key={id}
            style={{
              pointerEvents: item.id > count,
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
