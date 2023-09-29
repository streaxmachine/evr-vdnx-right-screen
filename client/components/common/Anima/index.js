import React from "react";
import Component from "./core/Component";

import tags from "./tags";

const components = tags;

Object.keys(tags).forEach((type) => {
  components[type] = React.forwardRef(function AnimaComponent(props, ref) {
    return <Component {...props} type={type} forwardedRef={ref} />;
  });
});

const useAnima = () => {
  return {
    anima: components,
  };
};

export default useAnima;
