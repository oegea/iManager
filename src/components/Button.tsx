import React from 'react';

// Constants
import { DEFAULT_BUTTON_BACKGROUND, DEFAULT_BUTTON_COLOR } from '../constants/components/buttons';

// Interfaces
import ButtonProps from '../interfaces/components/button-props';

const Button = (props:ButtonProps) => {

    let background = props.background || DEFAULT_BUTTON_BACKGROUND;
    let color = props.color || DEFAULT_BUTTON_COLOR;

    return (<div style={{
        background: background,
        color: color
    }} className="button">{props.children}</div>)
}

export default Button;