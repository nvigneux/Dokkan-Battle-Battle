/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import {
  useFloating,
  useHover,
  useInteractions,
  autoUpdate,
  offset,
  flip,
  shift,
  useFocus,
  useDismiss,
  useRole,
  safePolygon,
} from '@floating-ui/react';
import PropTypes from 'prop-types';

// Styles
import styles from './Tooltip.module.css';

function Tooltip({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context, {
    handleClose: safePolygon(),
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {label}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={styles.container}
          {...getFloatingProps()}
        >
          {children}
        </div>
      )}
    </>
  );
}

Tooltip.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default Tooltip;
