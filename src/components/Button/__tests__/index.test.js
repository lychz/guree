import React from 'react'
import renderer from 'react-test-renderer'
import Button from '..'

it('Button exports modules correctly', () => {
  const button = renderer
    .create(<Button>button</Button>)
    .toJSON();
  expect(button).toMatchSnapshot();
});