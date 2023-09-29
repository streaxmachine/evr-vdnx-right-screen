import React from "react";
import gsap from "gsap";
import clsx from "clsx";

export const mask = {
  enter: ({ element, delay, enter, ease, duration }) => {
    return gsap.to(gsap.utils.selector(element)(".child"), {
      yPercent: 0,
      ease: ease + ".out",
      delay,
      duration,
      ...enter,
    });
  },

  exit: ({ element, delay, exit, ease, duration }) => {
    return gsap.to(gsap.utils.selector(element)(".child"), {
      yPercent: 110,
      ease: ease + ".in",
      delay,
      duration,
      ...exit,
    });
  },

  wrapper: ({ type: Component, forwardedRef, children, ...props }) => {
    return (
      <>
        <style jsx>
          {`
            .root {
              position: relative;
              overflow: hidden;
            }
            .child {
              position: relative;
              display: inline-block;
            }
          `}
        </style>

        <div
          {...props}
          ref={forwardedRef}
          className={clsx(props.className, "root")}
        >
          <Component className="child" children={children} />
        </div>
      </>
    );
  },
};
