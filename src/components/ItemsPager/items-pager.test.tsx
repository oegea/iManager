import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ItemsPager from '.';

// Constants

describe('Test ItemsPager', () => {
  // Constants
  const DEFAULT_LABEL = 'Test Label';

  // Common variables
  let wrapper : ShallowWrapper<typeof ItemsPager>;

  beforeEach(() => {
    wrapper = shallow(<ItemsPager
      title={DEFAULT_LABEL}
      showButton
      buttonLabel={DEFAULT_LABEL}
    />);
  });

  it('should display the expected title', () => {
    expect(wrapper.find('.pager-title').text()).toBe(DEFAULT_LABEL);
  });

  it('should not display any button if it has not been specifically enabled', () => {
    wrapper = shallow(<ItemsPager title={DEFAULT_LABEL} buttonLabel={DEFAULT_LABEL} />);
    expect(wrapper.find('Button')).toHaveLength(0);
  });

  it('should display a button when it is enabled', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('should display a button with the expected properties', () => {
    expect(wrapper.find('Button').prop('children')).toBe(DEFAULT_LABEL);
    expect(wrapper.find('Button').prop('background')).toBe('#16C0AC');
    expect(wrapper.find('Button').prop('color')).toBe('white');
  });
});
