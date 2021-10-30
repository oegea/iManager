// Core dependencies
import React from 'react';

// Constants
import { DEFAULT_BUTTON_BACKGROUND, DEFAULT_BUTTON_COLOR, ENTER_KEY } from './button.constants';

// Interfaces
import ButtonProps from './interfaces/props';

const Button = (props:ButtonProps) => {
  // Required variables
  const {
    background, color, children, onClick,
  } = props;

  const style = {
    background,
    color,
  };

  /**
   * Executes search callback when enter is pressed
   * @param event Event data
   */
  const onKeyPress = (event:{key:string}) => {
    if (event.key === ENTER_KEY && onClick) { onClick(); }
  };

  // Render
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={onKeyPress}
      onClick={onClick}
      style={style}
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
