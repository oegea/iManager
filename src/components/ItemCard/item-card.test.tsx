import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ItemCard from '.';

// Constants

describe('Test ItemCard tests', () => {
  // Constants
  const DEFAULT_TITLE = 'iPhone 11';
  const DEFAULT_DESCRIPTION = 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.';
  const DEFAULT_PRICE = '740';
  const DEFAULT_EMAIL = 'iphonemail@wallapop.com';
  const DEFAULT_IMAGE = 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png';
  const DEFAULT_BUTTON_LABEL = 'Añadir a favoritos';

  // Common variables
  let wrapper : ShallowWrapper<typeof ItemCard>;

  beforeAll(() => {
    wrapper = shallow(<ItemCard
      title={DEFAULT_TITLE}
      description={DEFAULT_DESCRIPTION}
      price={DEFAULT_PRICE}
      email={DEFAULT_EMAIL}
      image={DEFAULT_IMAGE}
      buttonLabel={DEFAULT_BUTTON_LABEL}
    />);
  });

  it('should display the expected title', () => {
    expect(wrapper.find('.title').text()).toBe(DEFAULT_TITLE);
  });

  it('should display the expected photo', () => {
    expect(wrapper.find('.image > img').prop('src')).toBe(DEFAULT_IMAGE);
  });

  it('should display the expected description', () => {
    expect(wrapper.find('.description').text()).toBe(DEFAULT_DESCRIPTION);
  });

  it('should disply the expected price', () => {
    expect(wrapper.find('.price').text()).toBe(`${DEFAULT_PRICE} EUR`);
  });

  it('should display the expected e-mail', () => {
    expect(wrapper.find('.email').text()).toBe(`Seller: ${DEFAULT_EMAIL}`);
  });

  it('should display the "add to favourites" button', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('should have a button with the label received by props', () => {
    expect(wrapper.find('Button').prop('children')).toBe(DEFAULT_BUTTON_LABEL);
  });

  it('should call the expected callback when the button is clicked', () => {
    const callback = jest.fn();

    const itemCard = shallow(<ItemCard
      title={DEFAULT_TITLE}
      description={DEFAULT_DESCRIPTION}
      price={DEFAULT_PRICE}
      email={DEFAULT_EMAIL}
      image={DEFAULT_IMAGE}
      buttonLabel={DEFAULT_BUTTON_LABEL}
      onButtonClick={callback}
    />);

    itemCard.find('Button').simulate('click');

    expect(callback).toBeCalled();
  });

  it('should not call any callback if it hasn\'t been specified on props', () => {
    const callback = jest.fn();
    wrapper.find('Button').simulate('click');
    expect(callback).toBeCalledTimes(0);
  });
});
