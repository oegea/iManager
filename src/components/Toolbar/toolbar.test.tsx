import React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import Toolbar from '.';

// Constants
import { SECONDARY_BUTTON_BACKGROUND, SECONDARY_BUTTON_COLOR } from '../Button/button.constants';

describe('Test Toolbar tests', () => {
  // Constants
  const DEFAULT_LABEL = 'iManager';
  // Common variables
  let wrapper : ShallowWrapper<typeof Toolbar>;

  beforeAll(() => {
    wrapper = shallow(<Toolbar label={DEFAULT_LABEL} />);
  });

  describe('Basic structure', () => {
    it('should be contained inside a div', () => {
      expect(wrapper.type()).toEqual('div');
    });

    it('should contain the expected label', () => {
      expect(wrapper.find('.label').text()).toEqual(DEFAULT_LABEL);
    });

    it('should have a search input', () => {
      const mountWrapper = mount(<Toolbar label={DEFAULT_LABEL} />);
      expect(mountWrapper.find('SearchBar')).toHaveLength(1);
    });

    it('should have a favourites button', () => {
      const mountWrapper = mount(<Toolbar label={DEFAULT_LABEL} />);
      expect(mountWrapper.find('Button')).toHaveLength(1);
    });
  });

  describe('Favourites button test', () => {
    it('should call the expected callback when favourites button is clicked', () => {
      const callback = jest.fn();
      const toolbar = shallow(<Toolbar label={DEFAULT_LABEL} onFavouritesClick={callback} />);
      toolbar.find('Button').simulate('click');
      expect(callback).toBeCalled();
    });

    it('should have green background and white text color', () => {
      expect(wrapper.find('Button').prop('color')).toBe(SECONDARY_BUTTON_COLOR);
      expect(wrapper.find('Button').prop('background')).toBe(SECONDARY_BUTTON_BACKGROUND);
    });
  });

  describe('Searchbar test', () => {
    it('should call the expected callback when a search is performed', () => {
      const callback = jest.fn();
      const toolbar = mount(<Toolbar label={DEFAULT_LABEL} onSearch={callback} />);
      toolbar.find('input').simulate('keypress', { key: 'Enter' });
      expect(callback).toBeCalled();
    });
  });
});
