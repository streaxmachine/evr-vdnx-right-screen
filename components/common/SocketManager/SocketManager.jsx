import React, { useEffect } from "react";

export const useSocket = (props) => {
  const [socket, setSocket] = React.useState();
  useEffect(() => {
    const socket2 = new WebSocket("wss://wsdmxtest.herokuapp.com:443");
    setSocket(socket2);
    socket2.onopen = function () {
      console.log("Соединение установлено");
    };

    socket2.onmessage = function (event) {
      console.log(`Получено сообщение: ${event.data}`);
      if (event.data !== "ping") {
        const info = JSON.parse(event.data);
        if (info.type === "speed") {
          props[0](info.data);
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
