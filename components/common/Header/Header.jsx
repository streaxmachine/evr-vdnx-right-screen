import React, { useContext } from "react";

import s from "./Header.module.scss";

const Header = ({}) => {
  return (
    <div className={s.header}>
      <img src="/images/logo.svg" alt="" />
      <div className={s.rightWrapper}>
        <img src="/images/socials.svg" alt="" />
        <img src="/images/sandwich2.svg" alt="" />
      </div>
    </div>
  );
};

export default Header;
