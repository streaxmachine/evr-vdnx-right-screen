import gsap from "gsap";

export const fade = {
  enter: ({ element, delay, enter, ease, duration }) => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        ease: ease + ".out",
        delay,
        duration,
        ...enter,
      }
    );

    // return gsap.to(element, {
    //   opacity: 1,
    //   ease: ease + ".out",
    //   delay,
    //   duration,
    //   ...enter,
    // });
  },

  exit: ({ element, delay, exit, ease, duration }) => {
    return gsap.fromTo(
      element,
      { opacity: 1 },
      {
        opacity: 0,
        ease: ease + ".in",
        delay,
        duration,
        ...exit,
      }
    );

    // return gsap.to(element, {
    //   opacity: 0,
    //   ease: ease + ".in",
    //   delay,
    //   duration,
    //   ...exit,
    // });
  },
};
