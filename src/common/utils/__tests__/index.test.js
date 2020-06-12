import {
  generateClassesList,
  composeClasses,
  combineClasses,
  scopedClass,
  mediaAddLinstener,
} from "..";

describe("generateClassesList", () => {
  it("测试 string, Array, Object 类型参数", () => {
    expect(
      generateClassesList("cls1", ["cls2", "cls3"], { cls4: true, cls5: false })
    ).toEqual(["cls1", "cls2", "cls3", "cls4"]);
  });

  it("测试 '' 参数", () => {
    expect(generateClassesList("", [""])).toEqual([]);
  });

  it("测试 {} 参数", () => {
    expect(generateClassesList({})).toEqual([]);
  });

  it("测试无参数", () => {
    expect(generateClassesList()).toEqual([]);
  });
});

describe("composeClasses", () => {
  it("测试 string, Array, Object 类型参数", () => {
    expect(
      composeClasses("cls1", ["cls2", "cls3"], { cls4: true, cls5: false })
    ).toBe("cls1-cls2-cls3-cls4");
  });

  it("测试 '' 参数", () => {
    expect(composeClasses("", [""])).toBe("");
  });

  it("测试 {} 参数", () => {
    expect(composeClasses({})).toBe("");
  });

  it("测试无参数", () => {
    expect(composeClasses()).toBe("");
  });
});

describe("combineClasses", () => {
  it("测试 string, Array, Object 类型参数", () => {
    expect(
      combineClasses("cls1", ["cls2", "cls3"], { cls4: true, cls5: false })
    ).toBe("cls1 cls2 cls3 cls4");
  });

  it("测试 '' 参数", () => {
    expect(combineClasses("", [""])).toBe("");
  });

  it("测试 {} 参数", () => {
    expect(combineClasses({})).toBe("");
  });

  it("测试无参数", () => {
    expect(combineClasses()).toBe("");
  });
});

describe("scopedClass", () => {
  it("测试 string, Array, Object 类型参数", () => {
    expect(
      scopedClass("cls1", ["cls2", "cls3"], { cls4: true, cls5: false })
    ).toBe("guree-cls1-cls2-cls3-cls4");
  });

  it("测试 '' 参数", () => {
    expect(scopedClass("", [""])).toBe("guree");
  });

  it("测试 {} 参数", () => {
    expect(scopedClass({})).toBe("guree");
  });

  it("测试无参数", () => {
    expect(scopedClass()).toBe("guree");
  });
});

describe("mediaAddLinstener", () => {
  const fn = jest.fn();
  it("测试 mediaValue 为 number 类型参数", () => {
    mediaAddLinstener(
      fn,
      1
    )({
      matches: true,
    });
    expect(fn).toHaveBeenCalledWith(1);
  });

  it("测试 mediaValue 为 undefined 类型参数", () => {
    mediaAddLinstener(
      fn,
      undefined
    )({
      matches: true,
    });
    expect(fn).toHaveBeenCalledWith(0);
  });

  it("测试 matches 为 false 类型参数", () => {
    mediaAddLinstener(
      fn,
      1
    )({
      matches: false,
    });
  });
});
