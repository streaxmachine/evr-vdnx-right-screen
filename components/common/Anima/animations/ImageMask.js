import React from "react";
import gsap from "gsap";
import clsx from "clsx";

export const imageMask = {
  enter: ({ element, delay, enter, ease, duration }) => {
    return gsap.fromTo(
      element,
      { yPercent: 110 },
      {
        yPercent: 0,
        ease: ease + ".out",
        delay,
        duration,
        ...enter,
      }
    );

    // return gsap.to(element, {
    //   yPercent: 0,
    //   ease: ease + ".out",
    //   delay,
    //   duration,
    //   ...enter,
    // });
  },

  exit: ({ element, delay, exit, ease, duration }) => {
    return gsap.fromTo(
      element,
      { yPercent: 0 },
      {
        yPercent: 110,
        ease: ease + ".in",
        delay,
        duration,
        ...exit,
      }
    );

    // return gsap.to(element, {
    //   yPercent: 110,
    //   ease: ease + ".in",
    //   delay,
    //   duration,
    //   ...exit,
    // });
  },

  wrapper: ({ type: Component, forwardedRef, children, ...props }) => {
    return (
      <>
        <style jsx>
          {`
            .root {
              overflow: hidden;
            }
            .child:not(img) {
              z-index: 1000;
            }
            .child {
              position: relative;
              display: inline-block;
              width: 100%;
              height: 100%;
            }
          `}
        </style>

        <div className={clsx("root", props.className)}>
          <Component
            {...props}
            ref={forwardedRef}
            className="child"
            children={children}
          />
        </div>
      </>
    );
  },
};
