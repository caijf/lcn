import { DataType } from "../../src";

function dataTest(data: DataType) {
  it("检查数据", () => {
    expect(data.length).toBe(3225);
    expect(data[0]).toEqual({ code: "110000", name: "北京市" });
    expect(data[data.length - 1]).toEqual({
      code: "820000",
      name: "澳门特别行政区",
    });
    // 包含省
    expect(data).toContainEqual({ code: "110000", name: "北京市" });
    // 包含市
    expect(data).toContainEqual({ code: "110100", name: "北京市" });
    // 包含区
    expect(data).toContainEqual({ code: "110101", name: "东城区" });
  });

  it("直辖市", () => {
    expect(data).toContainEqual({ code: "110100", name: "北京市" });
    expect(data).toContainEqual({ code: "120100", name: "天津市" });
    expect(data).toContainEqual({ code: "310100", name: "上海市" });
    expect(data).toContainEqual({ code: "500100", name: "重庆市" });
  });

  it("部分省补充县级行政区划", () => {
    expect(data).toContainEqual({ code: "469000", name: "省直辖县级行政区划" });
    expect(data).toContainEqual({
      code: "659000",
      name: "自治区直辖县级行政区划",
    });
  });

  it("海南省三沙市补充区级数据", () => {
    expect(data).toContainEqual({ code: "460321", name: "西沙群岛" });
    expect(data).toContainEqual({ code: "460322", name: "南沙群岛" });
    expect(data).toContainEqual({
      code: "460323",
      name: "中沙群岛的岛礁及其海域",
    });
  });

  it("港澳台", () => {
    expect(data).toContainEqual({ code: "710000", name: "台湾省" });
    expect(data).toContainEqual({ code: "810000", name: "香港特别行政区" });
    expect(data).toContainEqual({ code: "820000", name: "澳门特别行政区" });
  });
}

export default dataTest;
