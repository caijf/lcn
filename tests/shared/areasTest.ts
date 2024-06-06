import { DataType } from "../../src";

function areasTest(data: DataType) {
  it("检查数据", () => {
    expect(data.length).toBe(2845);
    expect(data[0]).toEqual({ code: "110101", name: "东城区" });
    expect(data[data.length - 1]).toEqual({ code: "659012", name: "白杨市" });
    // 不包含市
    expect(data).not.toContainEqual({ code: "110100", name: "北京市" });
    // 不包含省
    expect(data).not.toContainEqual({ code: "110000", name: "北京市" });
  });

  it("海南省三沙市补充区级数据", () => {
    expect(data).toContainEqual({ code: "460321", name: "西沙群岛" });
    expect(data).toContainEqual({ code: "460322", name: "南沙群岛" });
    expect(data).toContainEqual({
      code: "460323",
      name: "中沙群岛的岛礁及其海域",
    });
  });
}

export default areasTest;
