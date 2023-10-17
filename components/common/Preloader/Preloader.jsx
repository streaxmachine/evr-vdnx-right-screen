import React from "react";
import clsx from "clsx";
import gsap from "gsap";
import addZero from "add-zero";

import useLoader from "hooks/useLoader";
import useStore from "hooks/useStore";
import useData from "hooks/useData";

import sc from "utils/stringToClass";
import delayer from "utils/delayer";
import { images, models } from "./resources";
import imgs from "./imgs";

import s from "./Preloader.module.scss";

const Preloader = ({ onLoaded }) => {
  const frontRef = React.useRef(null);
  const backRef = React.useRef(null);
  const valueRef = React.useRef(null);

  const data = useData({ timeline: null, curr: 0, prev: imgs.length - 1 });

  const handleLoaded = React.useCallback(() => {
    gsap.to(sc(s, ".root"), { opacity: 0, onComplete: onLoaded });
  }, [onLoaded]);

  const handleLoader = delayer((loader) => {
    const progress = Math.floor(loader.progress * 100);

    valueRef.current.innerHTML = addZero(progress, 3) + "%";

    if (progress === 100) {
      setTimeout(() => {
        data.timeline.repeat(1);
      }, 1500);
    }

    if (window.innerWidth > 414) {
      gsap.to(valueRef.current, {
        left: progress + "%",
        x: -progress + "%",
        duration: 2,
        overwrite: true,
        ease: "expo.out",
      });
    }
  });

  useLoader({ extraModels: models, extraImages: [...images] }, (loader) => {
    handleLoader(loader);
  });

  React.useEffect(() => {
    gsap.to(".preloader-cup", { opacity: 1 });

    data.timeline = gsap
      .timeline({
        repeat: -1,
        onRepeat: () => {
          data.prev = data.curr;
          data.curr = (data.curr + 1) % imgs.length;
        },
        onComplete: handleLoaded,
      })
      .fromTo(
        frontRef.current,
        {
          clipPath: "inset(0 0 0 100%)",
        },
        {
          clipPath: "inset(0 0 0 0%)",
          duration: 1,
          ease: "power3.out",
        }
      );

    return () => {
      data.timeline?.clear();
      data.timeline?.kill();
    };
  }, [handleLoaded]);

  return (
    <div className={clsx(s.root, "preloader-root")}>
      {/* <MaskCup className={clsx(s.maskCup, "preloader-cup")}>
        <div className={s.img} ref={backRef} />
        <div className={s.img} ref={frontRef} />
      </MaskCup> */}

      <div ref={valueRef} className={clsx(s.progress, "progress")}>
        000%
      </div>
    </div>
  );
};

export default React.memo(Preloader);
