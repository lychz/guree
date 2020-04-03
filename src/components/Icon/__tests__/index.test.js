import React from 'react'
import renderer from 'react-test-renderer'
import Icon from '../Icon'

it('renders correctly', () => {
  const icon = renderer
    .create(<Icon name="adn"></Icon>)
    .toJSON();
  expect(icon).toMatchSnapshot();
});
