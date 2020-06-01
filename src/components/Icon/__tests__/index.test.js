import React from 'react'
import renderer from 'react-test-renderer'
import Icon from '..'
// import "../importIcons";

it('Icon exports modules correctly', () => {
  const icon = renderer
    .create(<Icon name="adn"></Icon>)
    .toJSON();
  expect(icon).toMatchSnapshot();
});
