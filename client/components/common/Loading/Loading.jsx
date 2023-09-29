import React from "react";

import s from "./Loading.module.scss";

const Loading = ({ children, loading }) => {
  return (
    <>
      <div className={s.root}>
        <span className={s.loader} />
      </div>
    </>
  );
};

export default Loading;
