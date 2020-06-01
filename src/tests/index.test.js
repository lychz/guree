describe('build files', () => {
  it('build exports modules correctly', () => {
    const guree = require('..');
    expect(Object.keys(guree)).toMatchSnapshot();
  });
});