import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SearchBar from '.';

// Constants
import { DEFAULT_PLACEHOLDER, ENTER_KEY } from './search-bar.constants';

describe('Test SearchBar component', () => {
  // Constants
  const DEFAULT_VALUE = 'Test Value';
  const SHIFT_KEY = 'Shift';

  // Common variables
  let wrapper : ShallowWrapper<typeof SearchBar>;

  beforeAll(() => {
    wrapper = shallow(<SearchBar value={DEFAULT_VALUE} />);
  });

  it('should be contained inside a div', () => {
    expect(wrapper.type()).toEqual('div');
  });

  describe('Filter by text', () => {
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

    it('should update the text when writing on it', () => {
      const NEW_VALUE = 'New Test Value';
      const inputElement = wrapper.find('input');
      inputElement.simulate('change', { target: { value: NEW_VALUE } });
      wrapper.update();

      const inputProps = wrapper.find('input').props();
      expect(inputProps).toHaveProperty('value', NEW_VALUE);
    });

    it('should invoke a callback function when enter is pressed', () => {
      const enterCallback = jest.fn();
      wrapper = shallow(<SearchBar value={DEFAULT_VALUE} onSearch={enterCallback} />);

      wrapper.find('input').simulate('keypress', { key: ENTER_KEY });

      expect(enterCallback).toBeCalled();
    });

    it('should not invoke a callback function when other key different than enter is pressed', () => {
      const keyCallback = jest.fn();
      wrapper = shallow(<SearchBar value={DEFAULT_VALUE} onSearch={keyCallback} />);

      wrapper.find('input').simulate('keypress', { key: SHIFT_KEY });

      expect(keyCallback).toBeCalledTimes(0);
    });
  });

  describe('Sort by', () => {
    it('should invoke a callback function when the "sort by" field is changed', () => {
      const callback = jest.fn();
      wrapper = shallow(<SearchBar value={DEFAULT_VALUE} onSortByField={callback} sortableFields={['Email', 'Title']} />);
      wrapper.find('select').simulate('change', { target: { value: 'Email' } });
      wrapper.update();
      expect(callback).toBeCalled();
    });

    it('should not invoke a callback function when the "sort by" field is changed, if no callback has been defined', () => {
      const callback = jest.fn();
      wrapper = shallow(<SearchBar value={DEFAULT_VALUE} sortableFields={['Email', 'Title']} />);
      wrapper.find('select').simulate('change', { target: { value: 'Email' } });
      wrapper.update();
      expect(callback).toBeCalledTimes(0);
    });

    it('should render the sortable fields received by props', () => {
      wrapper = shallow(<SearchBar value={DEFAULT_VALUE} sortableFields={['Email', 'Title']} />);
      expect(wrapper.find('option')).toHaveLength(3); // 1 more because there's a default option
    });
  });
});
