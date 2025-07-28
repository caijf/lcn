import { CascadeData } from "../../src";

function pcFormTest(data: CascadeData[]) {
  it("检查数据", () => {
    expect(data[0]!.children!.length).toBe(1);
    expect(data[0]!.children![0]).toEqual({ value: "110100", label: "北京市" });
  });

  it("直辖市", () => {
    expect(data).toContainEqual({
      value: "110000",
      label: "北京市",
      children: [{ value: "110100", label: "北京市" }],
    });
    expect(data).toContainEqual({
      value: "120000",
      label: "天津市",
      children: [{ value: "120100", label: "天津市" }],
    });
    expect(data).toContainEqual({
      value: "310000",
      label: "上海市",
      children: [{ value: "310100", label: "上海市" }],
    });
    expect(data).toContainEqual({
      value: "500000",
      label: "重庆市",
      children: [
        { value: "500100", label: "重庆市" },
        { value: "500200", label: "县" },
      ],
    });
  });

  it("部分省补充县级行政区划", () => {
    const hn = data.find((item) => item.value === "460000");
    expect(hn!.children).toContainEqual({
      value: "469000",
      label: "省直辖县级行政区划",
    });

    const xj = data.find((item) => item.value === "650000");
    expect(xj!.children).toContainEqual({
      value: "659000",
      label: "自治区直辖县级行政区划",
    });
  });
}

export default pcFormTest;
