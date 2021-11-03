import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Modal from '.';
import { ENTER, SHIFT } from '../../constants/keys';

// Constants

describe('Test Modal component', () => {
  // Constants
  const DEFAULT_LABEL = 'Test Label';

  // Common variables
  let wrapper : ShallowWrapper<typeof Modal>;
  let callback : ()=>void;

  beforeEach(() => {
    callback = jest.fn();
    wrapper = shallow(
      <Modal onClose={callback}>
        {DEFAULT_LABEL}
      </Modal>,
    );
  });

  it('should display the expected content', () => {
    expect(wrapper.find('.body').text()).toBe(DEFAULT_LABEL);
  });

  it('should call the close callback when the close button is clicked', () => {
    wrapper.find('.close').simulate('click');
    expect(callback).toBeCalled();
  });

  it('should invoke a callback function when close button is focused and enter is pressed', () => {
    wrapper.find('.close').simulate('keypress', { key: ENTER });

    expect(callback).toBeCalled();
  });

  it('should not invoke a callback function when close button is focused and other key different than enter is pressed', () => {
    wrapper.find('.close').simulate('keypress', { key: SHIFT });

    expect(callback).toBeCalledTimes(0);
  });
});
