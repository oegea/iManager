import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ItemsGrid from '.';
import ItemCardProps from '../ItemCard/interfaces/props';

// Constants
import DEFAULT_ITEMS_ARRAY from '../../__mocks__/default-items-array';

describe('Test ItemsGrid component', () => {
  // Constants
  const ITEMS:Array<ItemCardProps> = DEFAULT_ITEMS_ARRAY;

  // Common variables
  let wrapper : ShallowWrapper<typeof ItemsGrid>;

  beforeAll(() => {
    wrapper = shallow(<ItemsGrid
      items={ITEMS}
    />);
  });

  it('should display two ItemCardHandler components', () => {
    expect(wrapper.find('ItemCardHandler')).toHaveLength(2);
  });
});
