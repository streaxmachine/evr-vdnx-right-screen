import React from "react";
import gsap from "gsap";
import clsx from "clsx";

export const split = {
  enter: ({ element, delay, enter, ease, stagger, duration }) => {
    const target = gsap.utils.selector(element)(".text");

    if (target.length === 0) {
      return { delay: () => {} };
    }

    return gsap.fromTo(
      target,
      {
        // yPercent: 110,
        yPercent: 0,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        stagger,
        inherit: false,
        immediateRender: true,
        ease: ease + ".out",
        delay,
        duration,
        ...enter,
      }
    );
  },

  exit: ({ element, delay, exit, ease, stagger, duration }) => {
    const target = gsap.utils.selector(element)(".text");

    if (target.length === 0) {
      return { delay: () => {} };
    }

    return gsap.fromTo(
      target,
      {
        yPercent: 0,
      },
      {
        yPercent: 110,
        stagger,
        inherit: false,
        immediateRender: true,
        ease: ease + ".in",
        delay,
        duration,
        ...exit,
      }
    );
  },

  wrapper: ({ type: Component, forwardedRef, children, ...props }) => {
    const array = React.Children.toArray(children);
    let words = [];

    array.forEach((item) => {
      if (typeof item === "string") {
        words.push(...item.split(" "));
      } else {
        words.push(item);
      }
    });

    words = [...words.filter((word) => word !== "")];

    return (
      <>
        <style jsx>
          {`
            .root {
              white-space: pre-wrap;
            }

            .wrapper {
              position: relative;
              display: inline-flex;
              overflow: hidden;
            }

            .text {
              position: relative;
              display: inline-block;
            }
          `}
        </style>

        <Component
          {...props}
          ref={forwardedRef}
          className={clsx(props.className, "root")}
        >
          {words.map((word, i) =>
            typeof word === "string" ? (
              <span className="wrapper" key={i + word}>
                <span className="text">{word} </span>
              </span>
            ) : (
              word
            )
          )}
        </Component>
      </>
    );
  },
};
