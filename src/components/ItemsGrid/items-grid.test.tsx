import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ItemsGrid from '.';
import ItemCardProps from '../ItemCard/interfaces/props';

// Constants

describe('Test ItemsGrid tests', () => {
  // Constants
  const ITEMS:Array<ItemCardProps> = [
    {
      title: 'iPhone 11',
      description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
      price: '740',
      email: 'iphonemail@wallapop.com',
      image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png',
      buttonLabel: 'Add to favourites',
    },
    {
      title: 'Bolso piel marca Hoss',
      description: 'Vendo bolso de piel marrón grande de la marca Hoss. Lo compré hace dos temporadas. Esta en perfectas condiciones, siempre se ha guardado en bolsa de tela para su conservación. Precio original de 400 euros. Lo vendo por 250 porque ya casi no me lo pongo. Tiene varios compartimentos dentro.',
      price: '250',
      email: 'bagmail@wallapop.com',
      image: 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/bag.png',
      buttonLabel: 'Add to favourites',
    },
  ];

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
