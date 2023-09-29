import React, { useEffect } from "react";
import { io } from "socket.io-client";

let soc;

export const useSocket = () => {
  const [socket, setSocket] = React.useState();
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    soc = io("http://localhost:3001");
    function onConnect() {
      console.log("connected");
    }
    function onHello(text) {
      console.log(text);
    }
    setSocket(soc);
    soc.on("connect", onConnect);
    soc.on("hello", onHello);
    return () => {
      soc.off("connect", onConnect);
      soc.off("hello", onHello);
    };
  };

  return socket;
};

const SocketManager = () => {
  return (
    <button
    //   onClick={() => {
    //     socket.emit("test", "ti_pidor");
    //   }}
    >
      click
    </button>
  );
};

export default React.memo(SocketManager);
