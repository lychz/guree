describe("打包组件", () => {
  it("正确导出组件包", () => {
    const guree = require("..");
    expect(Object.keys(guree)).toMatchSnapshot();
  });
});
