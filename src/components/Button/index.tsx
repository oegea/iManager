import React from 'react';

// Constants
import { DEFAULT_BUTTON_BACKGROUND, DEFAULT_BUTTON_COLOR } from './button.constants';

// Interfaces
import ButtonProps from './interfaces/props';

const Button = (props:ButtonProps) => {
  const { background, color, children } = props;

  return (
    <div
      style={{
        background,
        color,
      }}
      className="button"
    >
      {children}
    </div>
  );
};

const defaultProps: ButtonProps = {
  color: DEFAULT_BUTTON_COLOR,
  background: DEFAULT_BUTTON_BACKGROUND,
  children: '',
};

Button.defaultProps = defaultProps;

export default Button;
