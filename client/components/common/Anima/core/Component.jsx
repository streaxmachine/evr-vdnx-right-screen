import React from "react";

import Transition from "./Transition";

const Component = ({
  type,
  active,
  forwardedRef,
  in: inProp,
  children,
  component,
  ...props
}) => {
  const CustomComponent = React.forwardRef(function AnimaCustomComponent(
    props,
    ref
  ) {
    return <component.type {...props} forwardedRef={ref} />;
  });

  const customType = React.useMemo(
    () => (type === "custom" ? CustomComponent : type),
    [type]
  );

  return (
    <Transition
      {...props}
      active={active}
      type={customType}
      forwardedRef={forwardedRef}
      in={inProp}
      children={children}
    />
  );
};

export default React.memo(Component);
