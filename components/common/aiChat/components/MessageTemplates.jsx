import React from "react";

import s from "../aiChat.module.scss";
import clsx from "clsx";

const MessageTemplates = ({
  setText,
  setHandleSendFromTemplate,
  setShowHelper,
}) => {
  const handleClick = (e) => {
    setText(e.target.textContent);
    setHandleSendFromTemplate(true);
    setShowHelper(false);
  };
  return (
    <div className={s.messagesTemplateRoot}>
      <div className={s.messagesTemplateWrapper}>
        <div
          onClick={(e) => handleClick(e)}
          className={clsx(s.templateMes, s.temp1)}
        >
          Расскажи что-нибудь интересное о тверской области
        </div>
        <div className={s.tempDoubleWrapper}>
          <div
            onClick={(e) => handleClick(e)}
            className={clsx(s.templateMes, s.temp2)}
          >
            Где в Тверской области можно отдохнуть с детьми?
          </div>
          <div
            onClick={(e) => handleClick(e)}
            className={clsx(s.templateMes, s.temp3)}
          >
            Сколько людей живет в Твери?
          </div>
        </div>
        <div className={s.tempDoubleWrapper}>
          <div
            onClick={(e) => handleClick(e)}
            className={clsx(s.templateMes, s.temp5)}
          >
            Где в центре Твери можно вкусно поесть?
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageTemplates;
