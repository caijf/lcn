import { CascadeData, CascadeDataWithNull } from '../../src';

function pcTest(data: (CascadeData | CascadeDataWithNull)[]) {
  it("检查数据", () => {
    expect(data[0]!.children!.length).toBe(1);
    expect(data[0]!.children![0]).toEqual({ code: "110100", name: "北京市" });
  });

  it("直辖市", () => {
    expect(data).toContainEqual({
      code: "110000",
      name: "北京市",
      children: [{ code: "110100", name: "北京市" }],
    });
    expect(data).toContainEqual({
      code: "120000",
      name: "天津市",
      children: [{ code: "120100", name: "天津市" }],
    });
    expect(data).toContainEqual({
      code: "310000",
      name: "上海市",
      children: [{ code: "310100", name: "上海市" }],
    });
    expect(data).toContainEqual({
      code: "500000",
      name: "重庆市",
      children: [
        { code: "500100", name: "重庆市" },
        { code: "500200", name: "县" },
      ],
    });
  });

  it("部分省补充县级行政区划", () => {
    const hn = data.find((item) => item.code === "460000");
    expect(hn!.children).toContainEqual({
      code: "469000",
      name: "省直辖县级行政区划",
    });

    const xj = data.find((item) => item.code === "650000");
    expect(xj!.children).toContainEqual({
      code: "659000",
      name: "自治区直辖县级行政区划",
    });
  });
}

export default pcTest;
