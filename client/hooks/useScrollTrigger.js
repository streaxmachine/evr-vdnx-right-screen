import React from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import sc from "utils/stringToClass";
import { isString } from "lodash";

const useScrollTrigger = ({
  styles,
  trigger,
  scroller,
  animations,
  ...props
}) => {
  const tlRef = React.useRef(null);

  React.useEffect(() => {
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: isString(trigger) ? sc(styles, trigger) : trigger.current,
        scroller: scroller || "body",
        ...props,
      },
    });

    const q = gsap.utils.selector(tlRef.current.scrollTrigger.trigger);

    animations.forEach((animation) => {
      const params = [...animation[1]];

      if (styles) {
        params[0] = isString(params[0])
          ? q(sc(styles, params[0]))
          : params[0].current;
      }

      tlRef.current[animation[0]](...params);
    });

    ScrollTrigger.refresh();

    return () => {
      tlRef.current.kill();
    };
  }, []);
};

export default useScrollTrigger;
