import React from "react";
import gsap from "gsap";

import animations from "../animations";
import ScrollContext from "contexts/ScrollContext";

import useCombinedRefs from "../hooks/useCombinedRefs";
import useChangeEffect from "../hooks/useChangeEffect";
import { MainEvent } from "constants/events";

const Transition = (props) => {
  const {
    active = true,
    in: inProp,
    type: Component,
    forwardedRef,
    children,
    animation,
    animationExit,
    ease = "sine",
    duration = 1,
    enter = {},
    exit = {},
    delay = 0,
    stagger = 0.2,
    appear = false,
    appearDelay = 0,
    appearOnPreload,
    ...rest
  } = props;

  const ref = React.useRef(null);
  const combinedRef = useCombinedRefs(forwardedRef, ref);
  const animate = animations[animation];
  const animateExit = animations[animationExit];
  const data = React.useMemo(() => ({ firstAnimate: false }), []);

  const scroll = React.useContext(ScrollContext);

  const WrapperComponent = React.useMemo(
    () => animate.wrapper,
    [animate.wrapper]
  );

  const animateIn = React.useCallback(() => {
    gsap.killTweensOf(ref.current);
    ref.current.style = null;

    return animate.enter({
      element: ref.current,
      enter,
      delay,
      ease,
      stagger,
      duration,
    });
  }, [animate, stagger, delay, enter, ease, duration]);

  const animateOut = React.useCallback(() => {
    gsap.killTweensOf(ref.current);
    ref.current.style = null;

    const animateExtra = animateExit || animate;

    return animateExtra.exit({
      element: ref.current,
      exit,
      delay,
      ease,
      stagger,
      duration,
    });
  }, [animate, stagger, delay, exit, ease, duration]);

  React.useEffect(() => {
    if (!active) return () => {};

    const ctx = gsap.context(() => {
      if (appear === false) {
        if (inProp) {
          animateIn().totalProgress(1).kill();
        } else {
          animateOut().totalProgress(1).kill();
        }
      }
    });

    return () => ctx.revert();
  }, [active]);

  React.useEffect(() => {
    if (!active) return () => {};

    const ctx = gsap.context(() => {
      if (appear && inProp !== undefined && !appearOnPreload) {
        if (inProp) {
          animateIn().delay(appearDelay);
        } else {
          animateOut().delay(appearDelay);
        }
      }
    });

    return () => {
      ctx.revert();
    };
  }, [active, children]);

  const handle = React.useCallback(() => {
    animateIn().delay(appearDelay);
  }, [appearDelay]);

  React.useEffect(() => {
    if (!active) return () => {};

    if (appearOnPreload) {
      MainEvent.on("loaded", handle);
    }

    return () => MainEvent.off("loaded", handle);
  }, [active, children]);

  React.useEffect(() => {
    if (!active) return () => {};

    const handler = (name, state) => {
      if (name === ref.current.dataset.scrollCall) {
        if (state === "enter" && !data.firstAnimate) {
          data.firstAnimate = true;
          animateIn();
        }
      }
    };

    if (inProp === undefined && ref.current.dataset.scroll !== undefined) {
      scroll?.on("call", handler);
    }

    return () => scroll?.off && scroll.off("call", handler);
  }, [active, scroll]);

  useChangeEffect(() => {
    if (!active) return () => {};

    if (inProp === true) {
      animateIn();
    } else if (inProp === false) {
      animateOut();
    }
  }, inProp);

  if (WrapperComponent) {
    return (
      <>
        <WrapperComponent type={Component} forwardedRef={combinedRef} {...rest}>
          {children}
        </WrapperComponent>
      </>
    );
  }

  return (
    <>
      <Component ref={combinedRef} {...rest}>
        {children}
      </Component>
    </>
  );
};

export default React.memo(Transition);
