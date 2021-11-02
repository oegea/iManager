// Core dependencies
import React from 'react';

// Constants
import { DEFAULT_BUTTON_BACKGROUND, DEFAULT_BUTTON_COLOR } from './button.constants';
import { ENTER } from '../../constants/keys';

// Interfaces
import ButtonProps from './interfaces/props';

/**
 * A simple button to be used in the interface
 * @param props Properties to define the button behaviour
 * @returns React component
 */
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
   * Executes the button callback when enter is pressed
   * @param event Event data
   */
  const onKeyPress = (event:{key:string}) => {
    if (event.key === ENTER && onClick) { onClick(); }
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
