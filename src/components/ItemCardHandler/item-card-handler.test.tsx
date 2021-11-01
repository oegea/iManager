import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {
  RecoilRoot,
} from 'recoil';
import ItemCardHandler from '.';

// Constants

describe('Test ItemCardHandler component', () => {
  // Constants

  // Common variables
  let wrapper : ReactWrapper<typeof RecoilRoot>;

  beforeAll(() => {
    wrapper = mount(<RecoilRoot><ItemCardHandler /></RecoilRoot>);
  });

  it('should contain an ItemCard', () => {
    expect(wrapper.find('ItemCard')).toHaveLength(1);
  });

  it('should be properly added and removed from favourites when the button is clicked', () => {
    wrapper.find('ItemCard Button').simulate('click');
    wrapper.update();

    expect(wrapper.find('ItemCard').prop('buttonLabel')).toBe('Remove from favourites');

    wrapper.find('ItemCard Button').simulate('click');
    wrapper.update();

    expect(wrapper.find('ItemCard').prop('buttonLabel')).toBe('Add to favourites');
  });
});
