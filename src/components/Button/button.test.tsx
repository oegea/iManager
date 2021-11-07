import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { expect } from '@jest/globals';
import Button from '.';
import { ENTER, SHIFT } from '../../constants/keys';

// Constants
import { DEFAULT_BUTTON_BACKGROUND, DEFAULT_BUTTON_COLOR } from './button.constants';

describe('Test Button component', () => {
  // Constants
  const DEFAULT_LABEL = 'Default Label';
  const DEFAULT_BUTTON_CLASS = 'button';

  // Common variables
  let wrapper : ShallowWrapper<typeof Button>;

  beforeAll(() => {
    wrapper = shallow(<Button>{DEFAULT_LABEL}</Button>);
  });

  it('should be contained inside a div', () => {
    expect(wrapper.type()).toEqual('div');
  });

  it('should contain the expected label', () => {
    expect(wrapper.text()).toEqual(DEFAULT_LABEL);
  });

  it(`should have the ${DEFAULT_BUTTON_CLASS} css class`, () => {
    expect(wrapper.hasClass(DEFAULT_BUTTON_CLASS)).toBe(true);
  });

  it(`should have ${DEFAULT_BUTTON_BACKGROUND} as default color background`, () => {
    expect(wrapper.prop('style')).toHaveProperty('background', DEFAULT_BUTTON_BACKGROUND);
  });

  it(`should have ${DEFAULT_BUTTON_COLOR} as default font color`, () => {
    expect(wrapper.prop('style')).toHaveProperty('color', DEFAULT_BUTTON_COLOR);
  });

  it('should change background and font color when specified in properties', () => {
    const BACKGROUND = 'green';
    const COLOR = 'blue';

    const customButton = shallow(
      <Button background={BACKGROUND} color={COLOR}>{DEFAULT_LABEL}</Button>,
    );
    const buttonStyle = customButton.prop('style');

    expect(buttonStyle).toHaveProperty('background', BACKGROUND);
    expect(buttonStyle).toHaveProperty('color', COLOR);
  });

  it('should invoke a callback function when button is clicked', () => {
    const clickCallback = jest.fn();
    wrapper = shallow(<Button onClick={clickCallback}>{DEFAULT_LABEL}</Button>);

    wrapper.simulate('click');

    expect(clickCallback).toBeCalled();
  });

  it('should invoke a callback function when button is focused and enter is pressed', () => {
    const clickCallback = jest.fn();
    wrapper = shallow(<Button onClick={clickCallback}>{DEFAULT_LABEL}</Button>);

    wrapper.find('div').simulate('keypress', { key: ENTER });

    expect(clickCallback).toBeCalled();
  });

  it('should not invoke a callback function when button is focused and other key different than enter is pressed', () => {
    const clickCallback = jest.fn();
    wrapper = shallow(<Button onClick={clickCallback}>{DEFAULT_LABEL}</Button>);

    wrapper.find('div').simulate('keypress', { key: SHIFT });

    expect(clickCallback).toBeCalledTimes(0);
  });
});
