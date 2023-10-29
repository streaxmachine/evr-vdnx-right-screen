import React, { useEffect } from "react";

export const useSocket = (props) => {
  const [socket, setSocket] = React.useState();
  useEffect(() => {
    const socket2 = new WebSocket("wss://wsdmxtest.herokuapp.com:443");
    setSocket(socket2);
    socket2.onopen = function () {
      console.log("Соединение установлено");
      if (props) {
        props[4](true);
      }
    };

    socket2.onmessage = function (event) {
      // console.log(`Получено сообщение: ${event.data}`);
      if (event.data !== "ping") {
        const info = JSON.parse(event.data);

        if (props) {
          if (info.type === "speed") {
            // props[3](false);
            props[0](info.data);
          } else if (info.type === "distance") {
            // props[3](false);
            props[2](info.data);
          } else if (info.type === "calories") {
            // props[3](false);
            props[1](info.data);
          } else if (info.type === "timeout") {
            props[5](true);
            props[3](true);
          } else if (info.type === "isFree") {
            console.log("type free");
            if (Number(info.data) === 0) {
              console.log("type 1");
              console;
              props[5](false);
            } else {
              console.log("type 2");

              props[5](true);
            }
          }
        }
      } else {
        console.log("here");
        socket2.send(JSON.stringify("pong"));
      }
    };

    socket2.onclose = function (event) {
      console.log("Соединение закрыто");
    };

    setTimeout(() => {
      // socket2.send(JSON.stringify({ hello: "fffffff" }));
    }, 2000);

    socket2.onerror = function (error) {
      console.log(`Ошибка: ${error.message}`);
    };
  }, []);

  return socket;
};
