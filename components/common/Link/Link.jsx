import { memo, useEffect, useCallback } from 'react';
import p from 'prop-types';
import Link from 'next/link';

import isExternalLink from 'utils/isExternalLink';
import { useCursorEvents } from 'components/common/CustomCursor';

const LinkComponent = ({ to, children, className, cursorType = '', }) => {
  const [onCursorEnter, onCursorLeave] = useCursorEvents();

  useEffect(() => {
    return () => {
      onCursorLeave();
    };
  }, []);

  const mouseEnterHandler = useCallback(() => {
    onCursorEnter(cursorType);
  }, [onCursorEnter, cursorType]);

  const mouseLeaveHandler = useCallback(() => {
    onCursorLeave(true);
  }, [onCursorLeave]);

  return isExternalLink(to) ? (
    <a
      href={to}
      className={className}
      rel="noopener noreferrer"
      target="_blank"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {children}
    </a>
  ) : (
    <Link
      className={className}
      href={to}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {children}
    </Link>
  );
};

LinkComponent.propTypes = {
  className: p.string,
  children: p.node,
  to: p.string,
  cursorType: p.oneOf(['large']),
};

export default memo(LinkComponent);
