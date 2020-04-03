import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../Button'

it('renders correctly', () => {
  const button = renderer
    .create(<Button>button</Button>)
    .toJSON();
  expect(button).toMatchSnapshot();
});
