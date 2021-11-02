import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {
  RecoilRoot,
} from 'recoil';
import ItemsPagerHandler from '.';
import RecoilSetter from './items-pager-handler.recoil-setter';
import RecoilObserver from './items-pager-handler.recoil-observer';

// Constants

describe('Test ItemsPagerHandler component', () => {
  // Constants

  // Common variables
  let wrapper : ReactWrapper<typeof RecoilRoot>;

  beforeAll(() => {
    wrapper = mount(
      <RecoilRoot>
        <RecoilSetter loadedItemsValue={1} currentPageValue={0} />
        <ItemsPagerHandler />
      </RecoilRoot>,
    );
  });

  it('should contain an ItemsPager', () => {
    expect(wrapper.find('ItemsPager')).toHaveLength(1);
  });

  it('should show a button to load more items', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('should increase the current page when the button is pressed', () => {
    const callback = jest.fn();
    wrapper = mount(
      <RecoilRoot>
        <RecoilSetter loadedItemsValue={1} currentPageValue={0} />
        <RecoilObserver currentPageObserver={callback} />
        <ItemsPagerHandler />
      </RecoilRoot>,
    );

    wrapper.find('Button').simulate('click');
    expect(callback).toBeCalledWith(1);

    wrapper.find('Button').simulate('click');
    expect(callback).toBeCalledWith(2);
  });

  it('should not display a button if there are no more pages', () => {
    wrapper = mount(
      <RecoilRoot>
        <RecoilSetter loadedItemsValue={0} currentPageValue={0} />
        <ItemsPagerHandler />
      </RecoilRoot>,
    );
    expect(wrapper.find('Button')).toHaveLength(0);
  });
});
