import React from "react";
import useChangeEffect from "hooks/useChangeEffect";

const getBreakpoint = () => {
  if (window.innerWidth <= 414) {
    return { width: 375, height: 748 };
  }
  if (window.innerWidth <= 1024) {
    return { width: 1024, height: 768 };
  }
  return { width: 1728, height: 1043 };
};

const getFontRatio = () => {
  const breakpoint = getBreakpoint();
  const hRatio = window.innerWidth / breakpoint.width;
  const vRatio = window.innerHeight / breakpoint.height;

  return Math.min(hRatio, vRatio);
};

const useResponsible = () => {
  const [fontRatio, setFontRatio] = React.useState(1);

  const handleResize = () => {
    setFontRatio(getFontRatio());
  };

  React.useEffect(() => {
    handleResize();

    const timer = setTimeout(() => {
      handleResize();
    }, 1000);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    document.documentElement.style.setProperty("font-size", `${fontRatio}px`);
  }, [fontRatio]);
};

export default useResponsible;
