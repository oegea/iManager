// Core dependencies
import React from 'react';
import { RecoilRoot } from 'recoil';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

// Types
import { expect } from '@jest/globals';

// Http client
import AxiosClient from '../../libs/axios-client';
import FakeHttpClient from '../../__mocks__/fake-http-client';

// Api
import ItemApi from '../../api/item-api';

// Components
import AppHandler from '.';

// Constants
import DEFAULT_ITEMS from '../../__mocks__/default-items-array';

describe('Test AppHandler component', () => {
  // Constants

  // Common variables
  let wrapper : ReactWrapper<typeof AppHandler>;

  beforeEach(async () => {
    // Mock Axios Client
    jest.spyOn(AxiosClient.prototype, 'get').mockImplementation(new FakeHttpClient().get);

    await act(async () => {
      wrapper = mount(
        <RecoilRoot>
          <AppHandler />
        </RecoilRoot>,
      );
    });
  });

  it('should have a SearchBar component inside', () => {
    expect(wrapper.find('SearchBar')).toHaveLength(1);
  });

  it('should contain an ItemsPagerHandler inside', () => {
    expect(wrapper.find('ItemsPagerHandler')).toHaveLength(1);
  });

  it('should contain a ModalHandler component', () => {
    expect(wrapper.find('ModalHandler')).toHaveLength(1);
  });

  it('should contain a loading message by default', () => {
    expect(wrapper.find('p').text()).toBe('Loading...');
  });

  it('should render the ItemsGrid after loading', () => {
    wrapper.update();
    expect(wrapper.find('ItemsGrid')).toHaveLength(1);
  });

  it('should find items by text', async () => {
    wrapper.update();
    expect(wrapper.find('ItemCard')).toHaveLength(DEFAULT_ITEMS.length);

    // Find the first item in the array
    const FIND_VALUE = DEFAULT_ITEMS[0].title;
    wrapper.find('SearchBar input').simulate('change', { target: { value: FIND_VALUE } });
    wrapper.update();

    // Press enter and wait until search is finished
    await act(async () => {
      wrapper.find('SearchBar input').simulate('keypress', { key: 'Enter' });
    });

    wrapper.update();
    expect(wrapper.find('ItemCard')).toHaveLength(1);
  });

  it('should sort items by text', async () => {
    const FIRST_ITEM_TITLE = 'iPhone 11';
    const SECOND_ITEM_TITLE = 'Bolso piel marca Hoss';

    wrapper.update();

    expect(wrapper.find('ItemCard').first().prop('title')).toBe(FIRST_ITEM_TITLE);
    await act(async () => {
      wrapper.find('Toolbar select').simulate('change', { target: { value: 'Title' } });
    });

    wrapper.update();
    // Now the second item is the first because is sorted alphabetically
    expect(wrapper.find('ItemCard').first().prop('title')).toBe(SECOND_ITEM_TITLE);
  });

  it('should open the favourites modal when the button is clicked', () => {
    expect(wrapper.find('Modal')).toHaveLength(0);
    wrapper.find('Toolbar Button').simulate('click');
    wrapper.update();
    expect(wrapper.find('Modal')).toHaveLength(1);
  });

  it('should display an error message if an exception occurs while searching', async () => {
    jest.spyOn(ItemApi.prototype, 'search').mockImplementation(() => {
      throw new Error('simulated error');
    });

    await act(async () => {
      wrapper = mount(
        <RecoilRoot>
          <AppHandler />
        </RecoilRoot>,
      );
    });

    wrapper.update();
    expect(wrapper.find('p').text()).toBe('Unhandled exception while recovering items');
  });
});
