import dataMap from "../../data/data-map.json";

describe("data/data-map.json", () => {
  it("检查是否定义", () => {
    expect(dataMap).toBeDefined();
  });

  it("检查数据", () => {
    expect(dataMap.length).toBe(3221);
    expect(dataMap[0]).toEqual(["110000", "北京市"]);
    expect(dataMap[dataMap.length - 1]).toEqual(["820000", "澳门特别行政区"]);
    // 包含省
    expect(dataMap).toContainEqual(["110000", "北京市"]);
    // 包含市
    expect(dataMap).toContainEqual(["110100", "北京市"]);
    // 包含区
    expect(dataMap).toContainEqual(["110101", "东城区"]);
  });

  it("直辖市", () => {
    expect(dataMap).toContainEqual(["110100", "北京市"]);
    expect(dataMap).toContainEqual(["120100", "天津市"]);
    expect(dataMap).toContainEqual(["310100", "上海市"]);
    expect(dataMap).toContainEqual(["500100", "重庆市"]);
  });

  it("部分省补充县级行政区划", () => {
    expect(dataMap).toContainEqual(["469000", "省直辖县级行政区划"]);
    expect(dataMap).toContainEqual(["659000", "自治区直辖县级行政区划"]);
  });

  it("海南省三沙市补充区级数据", () => {
    expect(dataMap).toContainEqual(["460321", "西沙群岛"]);
    expect(dataMap).toContainEqual(["460322", "南沙群岛"]);
    expect(dataMap).toContainEqual(["460323", "中沙群岛的岛礁及其海域"]);
  });

  it("港澳台", () => {
    expect(dataMap).toContainEqual(["710000", "台湾省"]);
    expect(dataMap).toContainEqual(["810000", "香港特别行政区"]);
    expect(dataMap).toContainEqual(["820000", "澳门特别行政区"]);
  });
});
