// Core libraries
import React from 'react';
import { RecoilRoot } from 'recoil';
import { mount, ReactWrapper } from 'enzyme';

// Components
import ModalHandler from '.';

// Testing components
import RecoilSetter from './modal-handler.recoil-setter';

// Constants
import DEFAULT_ITEMS from '../../__mocks__/default-items-array';
import { ENTER } from '../../constants/keys';

describe('Test ModalHandler', () => {
  // Constants

  // Common variables
  let wrapper : ReactWrapper<typeof ModalHandler>;

  beforeEach(() => {
    wrapper = mount(
      <RecoilRoot>
        <RecoilSetter showFavouritesModal favouriteItems={DEFAULT_ITEMS} />
        <ModalHandler />
      </RecoilRoot>,
    );
  });

  it('should not display a Modal until the favourites button is clicked', () => {
    wrapper = mount(
      <RecoilRoot>
        <RecoilSetter showFavouritesModal={false} favouriteItems={[]} />
        <ModalHandler />
      </RecoilRoot>,
    );
    expect(wrapper.find('Modal')).toHaveLength(0);
  });

  it('should display a Modal if the favourites button has been clicked', () => {
    expect(wrapper.find('Modal')).toHaveLength(1);
  });

  it('should display as many ItemCards as items marked as favourites', () => {
    expect(wrapper.find('ItemCard')).toHaveLength(DEFAULT_ITEMS.length);
  });

  it('should remove an item from favourites when the delete button is clicked', () => {
    expect(wrapper.find('ItemCard')).toHaveLength(DEFAULT_ITEMS.length);
    wrapper.find('Button').first().simulate('click');
    expect(wrapper.find('ItemCard')).toHaveLength(DEFAULT_ITEMS.length - 1);
  });

  it('should filter by text recovering only items that matches the criteria', () => {
    // At the begining we should have as many items as we have
    expect(wrapper.find('ItemCard')).toHaveLength(2);

    // Filter by text
    const ITEM_TITLE = 'iPhone 11';
    const inputElement = wrapper.find('SearchBar input');
    inputElement.simulate('change', { target: { value: ITEM_TITLE } });
    wrapper.update();

    // Press enter to search
    wrapper.find('SearchBar input').simulate('keypress', { key: ENTER });
    wrapper.update();

    // Now that we made a search, only one item is displayed
    expect(wrapper.find('ItemCard')).toHaveLength(1);
  });

  it('should hide the Modal when the close button is clicked', () => {
    expect(wrapper.find('Modal')).toHaveLength(1);

    wrapper.find('.close').simulate('click');
    wrapper.update();

    expect(wrapper.find('Modal')).toHaveLength(0);
  });

  it('should display a message when there are not favourite items in the list', () => {
    wrapper = mount(
      <RecoilRoot>
        <RecoilSetter showFavouritesModal favouriteItems={[]} />
        <ModalHandler />
      </RecoilRoot>,
    );

    expect(wrapper.find('.no-favourite-items')).toHaveLength(1);
    expect(wrapper.find('.no-favourite-items').text()).toBe('You have no favourite items');
  });
});
