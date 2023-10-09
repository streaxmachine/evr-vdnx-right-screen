import { useContext } from "react";
import SoundContext from "contexts/SoundProvider/SoundContext";

const useCart = () => {
  return useContext(SoundContext);
};

export default useCart;
