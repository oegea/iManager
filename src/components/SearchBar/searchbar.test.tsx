import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SearchBar from '.';

// Constants
import { DEFAULT_PLACEHOLDER } from './searchbar.constants';

describe('Test SearchBar component', () => {
  // Constants
  const DEFAULT_VALUE = 'Test Value';

  // Common variables
  let wrapper : ShallowWrapper<typeof SearchBar>;

  beforeAll(() => {
    wrapper = shallow(<SearchBar value={DEFAULT_VALUE} />);
  });

  it('should be contained inside a div', () => {
    expect(wrapper.type()).toEqual('div');
  });

  it('should have an input node inside the bar structure', () => {
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it(`should have the ${DEFAULT_PLACEHOLDER} word as placeholder`, () => {
    const inputElement = wrapper.find('input');
    expect(inputElement.props()).toHaveProperty('placeholder', DEFAULT_PLACEHOLDER);
  });

  it('should be able to receive a default value', () => {
    const inputElement = wrapper.find('input');
    expect(inputElement.props()).toHaveProperty('value', DEFAULT_VALUE);
  });

  /* it('should update the text when writing on it', () => {
    const NEW_VALUE = 'New Test Value';
    const inputElement = wrapper.find('input');
    inputElement.simulate('change', { target: { value: NEW_VALUE } });

    expect(inputElement.props()).toHaveProperty('value', NEW_VALUE);
  }); */

  it('should invoke a callback function when enter is pressed', () => {

  });
});
