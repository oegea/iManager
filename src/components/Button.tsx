import React from 'react';
import { DEFAULT_BUTTON_BACKGROUND, DEFAULT_BUTTON_COLOR } from '../constants/components/buttons';

const Button = (props:any) => {

    let background = props.background || DEFAULT_BUTTON_BACKGROUND;
    let color = props.color || DEFAULT_BUTTON_COLOR;

    return (<div style={{
        background: background,
        color: color
    }} className="button">{props.label}</div>)
}

export default Button;